import { Subscriptions } from "@/types/subscription";
import { Episode } from '@/lib/rss/types';
import { kv } from "@vercel/kv";
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, '10 s'),
})

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
        const subscriptions = await kv.get('subscriptions') as Subscriptions
        subscriptions.forEach((sub) => {
            webpush.sendNotification(sub, audioOfTheDay.title);
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