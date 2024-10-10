import { Subscriptions, SubscriptionsV2 } from "@/types/subscription";
import { Episode } from '@/lib/rss/types';
import { kv } from "@vercel/kv";
import { Ratelimit } from '@upstash/ratelimit'
import { supabase } from "@/lib/db";

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
        const { data, error } = await supabase.from('notifications').select('endpoint, auth, p256dh, is_active')

        if (error) throw error;

        const subscriptions = data as SubscriptionsV2;


        subscriptions.forEach((sub) => {
            const buildedSub = {
                endpoint: sub.endpoint,
                keys: {
                    p256dh: sub.p256dh,
                    auth: sub.auth
                },
                expirationTime: null
            }
            webpush.sendNotification(buildedSub, audioOfTheDay.title)
                .then((res: any) => console.log(res))
                .catch((err: any) => {
                    console.log(err);
                });
        });
        return new Response('OK', {
            status: 200
        })
    } catch (error) {
        console.log('error', error)
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