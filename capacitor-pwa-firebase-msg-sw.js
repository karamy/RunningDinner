
(function() {
    // Ho dovuto impostare la funzione che gestisce il click sulla notifica prima di importare le librerie client di Firebase perchè ne annullano il comportamento
    self.addEventListener('notificationclick', (event) => {
        console.log('[Service Worker] Notification click Received. event', event);
        event.notification.close();
        
        if (clients.openWindow && event.notification.data.url) {
            event.waitUntil(clients.openWindow(event.notification.data.url));
        } else {
            if(clients.openWindow){
                event.waitUntil(clients.openWindow('https://localhost:8080'));
            }
        }
    });

  importScripts('./firebase-app.js');
  importScripts('./firebase-messaging.js');

  firebase.initializeApp({
    messagingSenderId: '65032950194'
  });

  const messaging = firebase.messaging();

  self.addEventListener('push', (event) => {
    //event.stopImmediatePropagation();
  });
  
  self.addEventListener('pushsubscriptionchange', e => {
    //event.stopImmediatePropagation();
  });

  messaging.setBackgroundMessageHandler(msgPayload => {
    return messaging.sendMessageToWindowClients_(msgPayload);
  });
})();
