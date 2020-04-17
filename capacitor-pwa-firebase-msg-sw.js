
(function() {
  importScripts('./firebase-app.js');
  importScripts('./firebase-messaging.js');

  firebase.initializeApp({
    messagingSenderId: '65032950194'
  });

  const messaging = firebase.messaging();

  self.addEventListener('push', (event) => {
    event.stopImmediatePropagation();
  });
  
  self.addEventListener('pushsubscriptionchange', e => {
    event.stopImmediatePropagation();
  });

  messaging.setBackgroundMessageHandler(msgPayload => {
    return messaging.sendMessageToWindowClients_(msgPayload);
  });
})();
