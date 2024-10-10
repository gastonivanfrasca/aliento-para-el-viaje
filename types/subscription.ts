export type Subscription = {
    endpoint: string;
    expirationTime: number | null;
    keys: {
        p256dh: string;
        auth: string;
    }
}

export type Subscriptions = Subscription[];


export type SubcriptionV2 = {
    endpoint: string;
    p256dh: string;
    auth: string;
    is_active: boolean
}

export type SubscriptionsV2 = SubcriptionV2[]