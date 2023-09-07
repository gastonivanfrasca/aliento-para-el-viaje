declare interface PushEvent extends ExtendableEvent {
    data: {
        text(): string;
    };
}

declare interface ExtendableEvent extends Event {
    waitUntil(fn: Promise<any>): void;
}

declare var self: ServiceWorkerGlobalScope & typeof globalThis;

interface ServiceWorkerGlobalScope {
    addEventListener(
        type: 'pushsubscriptionchange',
        listener: (this: ServiceWorkerGlobalScope, ev: PushSubscriptionChange) => any,
        options?: boolean | AddEventListenerOptions
      ): void;
}

declare interface NotificationClickEvent extends Event {
    action: string;
    notification: Notification;
}

declare interface PushSubscriptionChange extends ExtendableEvent {
    oldSubscription: PushSubscription | null;
    newSubscription: PushSubscription | null;
  }
  
  declare interface PushSubscription {
    endpoint: string;
    toJSON(): {
      endpoint: string;
      expirationTime: number | null;
      keys: {
        p256dh: string;
        auth: string;
      };
    };
  }