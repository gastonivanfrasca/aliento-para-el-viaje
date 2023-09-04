self.addEventListener('push', function (event) {
  const options = {
    //@ts-ignore
    body: event.data.text(),
    icon: '/icon.png',
    badge: '/badge.png'
  };
  //@ts-ignore
  event.waitUntil(
    //@ts-ignore
    self.registration.showNotification('Aliento para el viaje', options)
  );
});