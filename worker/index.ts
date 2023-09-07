self.addEventListener('push', function (event: PushEvent) {
  if (!event.data) {
    return;
  }
  const options: NotificationOptions = {
    body: event.data.text(),
    icon: '/icon.png',
    badge: '/badge.png'
  };
  event.waitUntil(
    self.registration.showNotification('Audio del día disponible', options)
  );
});

self.addEventListener('notificationclick', function (event: NotificationClickEvent) {
  event.notification.close();
  clients.openWindow('https://www.alientoparaelviaje.com/');
});


(self as any).addEventListener('pushsubscriptionchange', function (event: PushSubscriptionChange) {
  event.waitUntil(
    fetch('https://www.alientoparaelviaje.com/renew-sub', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        old_endpoint: event.oldSubscription ? event.oldSubscription.endpoint : null,
        new_endpoint: event.newSubscription ? event.newSubscription.endpoint : null,
        new_p256dh: event.newSubscription ? event.newSubscription.toJSON().keys!.p256dh : null,
        new_auth: event.newSubscription ? event.newSubscription.toJSON().keys!.auth : null
      })
    })
  );
});