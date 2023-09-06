import { kv } from '@vercel/kv';
import axios from 'axios'
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, '10 s'),
})

const baseUrl = 'https://api.assemblyai.com/v2'

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
        const pollingEndpoint = `${baseUrl}/transcript/${trasncriptID}`
        const pollingResponse = await axios.get(pollingEndpoint, {
            headers: headers
        })
        const transcriptionResult = pollingResponse.data
        console.log(transcriptionResult.text)
        kv.set('transcription', transcriptionResult.text)

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