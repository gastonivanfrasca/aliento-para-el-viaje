import { kv } from "@vercel/kv";
import { Subscriptions, Subscription } from "@/types/subscription";
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, '10 s'),
})

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
        const subscription = body;
        let subscriptions = await kv.get('subscriptions') as Subscriptions;
        if (!subscriptions || !Array.isArray(subscriptions) || subscriptions.length === 0) {
            subscriptions = [] as Subscriptions;
        }
        const alreadySubscribed = checkIfAlreadySubscribed(subscription, subscriptions);
        if (alreadySubscribed) {
            return new Response('Already subscribed', {
                status: 200
            })
        }
        subscriptions.push(subscription);
        kv.set('subscriptions', subscriptions);

        return new Response('Subscription saved', {
            status: 200
        })
    } catch (error) {
        console.log('error', error)
        return new Response('Error saving subscription', {
            status: 500
        })
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const subscription = body;
        kv.get('subscriptions').then((subs) => {
            const subscriptions = subs as Subscriptions;
            const alreadySubscribed = checkIfAlreadySubscribed(subscription, subscriptions);
            if (!alreadySubscribed) {
                return new Response('Not subscribed', {
                    status: 200
                })
            }
            subscriptions.splice(subscriptions.indexOf(alreadySubscribed), 1);
        })
        return new Response('Subscription removed', {
            status: 200
        })
    } catch (error) {

        return new Response('Error removing subscription', {
            status: 500
        })
    }
}

const checkIfAlreadySubscribed = (subscription: Subscription, subscriptions: Subscriptions) => {
    const alreadySubscribed = subscriptions.find((sub) => {
        return sub.endpoint === subscription.endpoint;
    })
    return alreadySubscribed;
}