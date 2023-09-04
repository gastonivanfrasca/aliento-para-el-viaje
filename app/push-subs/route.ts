import { kv } from "@vercel/kv";
import { Subscriptions, Subscription } from "@/types/subscription";


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const subscription = body;
        kv.get('subscriptions').then((subs) => {
            const subscriptions = subs as Subscriptions;
            const alreadySubscribed = checkIfAlreadySubscribed(subscription, subscriptions);
            if (alreadySubscribed) {
                return new Response('Already subscribed', {
                    status: 200
                })
            }
            subscriptions.push(subscription);
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