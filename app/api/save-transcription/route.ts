import { kv } from '@vercel/kv';
import axios from 'axios'
import { Ratelimit } from '@upstash/ratelimit'
import { Episode } from '@/lib/rss/types';
import { supabase } from '@/lib/db';

const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, '10 s'),
})

const baseUrl = 'https://api.assemblyai.com/v2'

const AUDIO_OF_THE_DAY_KEY = 'audioOfTheDay'

const headers = {
    authorization: process.env.ASSEMBLY_API,
}

export async function POST(request: Request) {
    //  @ts-ignore
    const ip = request.ip ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)
    if (!success) {
        return new Response('Too many requests', {
            status: 429
        })
    }
    try {
        const body = await request.json();
        const trasncriptID = body.transcript_id
        const pollingEndpoint = `${baseUrl}/transcript/${trasncriptID}/srt`
        const pollingResponse = await axios.get(pollingEndpoint, {
            headers: headers
        })
        const transcriptionResult = pollingResponse.data
        const storedAudio = await getStoredAudio() as Episode
        storedAudio.text = transcriptionResult
        await kv.set(AUDIO_OF_THE_DAY_KEY, JSON.stringify(storedAudio))
        // insert the transcription in the latest audio
        const { data, error } = await supabase
            .from('audios')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) throw error;
        
        const transcriptionSave = await supabase
            .from('audios')
            .update({ transcription: transcriptionResult })
            .eq('audio_id', data.audio_id);

        if (transcriptionSave.error) throw transcriptionSave.error

        return new Response('OK', {
            status: 200
        })
    } catch (error) {
        return new Response('Error', {
            status: 500
        })
    }

}


const checkRequestSignature = async (request: Request) => {
    const signature = request.headers.get('x-hook-signature');
    if (!signature) {
        return false;
    }
    if (signature === process.env.WBHPUK) {
        return true;
    } else {
        return false;
    }
}


const getStoredAudio = async () => {
    const storedAudio = await kv.get('audioOfTheDay')
    return storedAudio
}
