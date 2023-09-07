import { kv } from "@vercel/kv";
import { Subscriptions} from "@/types/subscription";
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, '10 s'),
})

type SubscriptionToRenew = {
    old_endpoint: string,
    new_endpoint: string,
    new_p256dh: string
    new_auth: string
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
        const subscription = body as SubscriptionToRenew;
        kv.get('subscriptions').then((subs) => {
            const subscriptions = subs as Subscriptions;
            const alreadySubscribed = checkIfAlreadySubscribed(subscription.new_endpoint, subscriptions);
            if (!alreadySubscribed) {
                return new Response('Not subscribed', {
                    status: 200
                })
            }
            subscriptions.splice(subscriptions.indexOf(alreadySubscribed), 1);
            subscriptions.push({
                endpoint: subscription.new_endpoint,
                keys: {
                    p256dh: subscription.new_p256dh,
                    auth: subscription.new_auth
                },
                expirationTime: null
            });
            kv.set('subscriptions', subscriptions);
        })
        return new Response('Subscription saved', {
            status: 200
        })
    } catch (error) {
        return new Response('Error saving subscription', {
            status: 500
        })
    }
}

const checkIfAlreadySubscribed = (endpoint: string, subscriptions: Subscriptions) => {
    return subscriptions.find((sub) => sub.endpoint === endpoint);
}