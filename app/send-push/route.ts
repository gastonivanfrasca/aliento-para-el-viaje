import { Subscriptions } from "@/types/subscription";
import { Episode } from '@/lib/rss/types';
import { kv } from "@vercel/kv";
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, '10 s'),
})

const AUDIO_OF_THE_DAY_KEY = 'audioOfTheDay'

const webpush = require('web-push');


const vapidKeys = {
    publicKey: process.env.VAP_PUB,
    privateKey: process.env.VAP
};

webpush.setVapidDetails(
    'mailto:alientoparaelviajeaudios@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


export async function POST(request: Request) {
    //  @ts-ignore
    const ip = request.ip ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)
    if (!success) {
        return new Response('Too many requests', {
            status: 429
        })
    }

    const valid = await checkRequestSignature(request);
    if (!valid) {
        return new Response('Invalid signature', {
            status: 401
        })
    }
    try {
        const body = await request.json();
        const audioOfTheDay = body as Episode;
        await kv.set(AUDIO_OF_THE_DAY_KEY, JSON.stringify(audioOfTheDay));
        await transcribeAudio(process.env.ASSEMBLY_API!, audioOfTheDay.enclosure["@_url"])
        const subscriptions = await kv.get('subscriptions') as Subscriptions
        subscriptions.forEach((sub) => {
            webpush.sendNotification(sub, body.title);
        });
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


async function transcribeAudio(api_token: string, audio_url: string) {
    console.log("Transcribing audio... This might take a moment.");

    const headers = {
        authorization: api_token,
        "content-type": "application/json",
    };

    try {

    await fetch("https://api.assemblyai.com/v2/transcript", {
        method: "POST",
        body: JSON.stringify({
            audio_url,
            webhook_url: 'https://www.alientoparaelviaje.com/save-transcription',
            language_code: 'es'
        }),
        headers,
    });
    } catch (error) {
        console.log('error', error)
    }
}