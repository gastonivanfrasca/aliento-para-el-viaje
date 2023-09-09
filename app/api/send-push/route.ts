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
            webpush.sendNotification(sub, audioOfTheDay.title)
                .then((res: any) => console.log(res))
                .catch((err: any) => {
                    if (err.statusCode === 410) {
                        kv.get('subscriptions').then((subs) => {
                            const subscriptions = subs as Subscriptions;
                            const alreadySubscribed = checkIfAlreadySubscribed(sub, subscriptions);
                            if (!alreadySubscribed) {
                                return new Response('Not subscribed', {
                                    status: 200
                                })
                            }
                            subscriptions.splice(subscriptions.indexOf(alreadySubscribed), 1);
                        })
                    }
                });
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

const checkIfAlreadySubscribed = (subscription: any, subscriptions: Subscriptions) => {
    const alreadySubscribed = subscriptions.find((sub) => {
        return sub.endpoint === subscription.endpoint;
    });
    return alreadySubscribed;
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