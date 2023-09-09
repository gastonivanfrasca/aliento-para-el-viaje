//@ts-nocheck

self.addEventListener('push', function (event) {
  let text = "Ingresa a la app para escucharlo"
  if (event.data) {
    text = event.data.text()
  }
  event.waitUntil(
    registration.showNotification('Audio del día disponible', {
      body: text,
      icon: '/icons/android-chrome-192x192.png'
    })
  )
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  clients.openWindow('https://www.alientoparaelviaje.com/');
});

addEventListener('pushsubscriptionchange', function (event) {
  event.waitUntil(
    fetch('https://www.alientoparaelviaje.com/renew-sub', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        old_endpoint: event.oldSubscription ? event.oldSubscription.endpoint : null,
        new_endpoint: event.newSubscription ? event.newSubscription.endpoint : null,
        new_p256dh: event.newSubscription ? event.newSubscription.toJSON().keys.p256dh : null,
        new_auth: event.newSubscription ? event.newSubscription.toJSON().keys.auth : null
      })
    })
  );
});