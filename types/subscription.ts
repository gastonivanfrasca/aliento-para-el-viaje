export type Subscription = {
    endpoint: string;
    expirationTime: number;
    keys: {
        p256dh: string;
        auth: string;
    }
}

export type Subscriptions = Subscription[];