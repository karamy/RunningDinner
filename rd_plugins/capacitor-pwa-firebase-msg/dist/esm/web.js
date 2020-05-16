var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from '@capacitor/core';
import { firebase } from '@firebase/app';
import '@firebase/messaging';
export class PWAFirebaseMsgWeb extends WebPlugin {
    constructor() {
        super({
            name: 'PushNotifications',
            platforms: ['web']
        });
    }
    echo(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ECHO', options);
            return options;
        });
    }
    ensureFirebase() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.promiseFirebase) {
                this.promiseFirebase = new Promise((resolve, reject) => {

                    // Recupero file firebase.config.json per inizializzazione
                    const jsonConfigRequest = new XMLHttpRequest();
                    jsonConfigRequest.overrideMimeType("application/json");
                    jsonConfigRequest.open('GET', 'firebase.config.json', true);
                    jsonConfigRequest.onreadystatechange = () => __awaiter(this, void 0, void 0, function* () {
                        try {
                            if (jsonConfigRequest.readyState === 4) {
                                if (jsonConfigRequest.status === 200) {
                                    const config = JSON.parse(jsonConfigRequest.responseText);
                                    yield this.initializeFirebase(config);
                                    resolve();
                                }
                                else
                                    throw new Error(jsonConfigRequest.statusText);
                            }
                        }
                        catch (ex) {
                            console.error("RD - Problemi durante l'inizializzazione del service worker per notifiche push: " + ex.message);
                        }
                    });
                    jsonConfigRequest.send(null);
                });
            }
            yield this.promiseFirebase;
        });
    }
    initializeFirebase(config) {
        return __awaiter(this, void 0, void 0, function* () {
            // Inizializzazione Firebase, verificando che non sia già stato fatto in precedenza
            if (!firebase.apps.length) {
                firebase.initializeApp(config);
            }

            if (!firebase.messaging.isSupported())
                throw new Error('Firebase messaging is not supported');
            else {
                const registration = yield navigator.serviceWorker.ready;
                console.log("RD - Collegamento Plugin Firebase PWA a ServiceWorker");

                this.firebaseMessaging = firebase.messaging();
                this.firebaseMessaging.useServiceWorker(registration); // Indico a Firebase di appoggiarsi al service-worker eventualmente presente

                yield Notification.requestPermission(); // Richiesta permessi per il web

                this.firebaseMessaging.usePublicVapidKey(config.vapidKey); // Configuro la chiave per gestione notifiche web

                this.firebaseMessaging.onMessage((payload) => {
                    console.log("RD - OnMessage");
                    const pushNotification = {
                        data: payload.data
                    };
                    if (payload.hasOwnProperty('notification')) {
                        pushNotification.title = payload.notification.title;
                        pushNotification.body = payload.notification.body;
                        this.notifyListeners('pushNotificationReceived', pushNotification);
                    }
                    else {
                        const pushNotificationActionPerformed = {
                            notification: pushNotification,
                            actionId: 'tap'
                        };
                        this.notifyListeners('pushNotificationActionPerformed', pushNotificationActionPerformed);
                    }
                });

                this.firebaseMessaging.onTokenRefresh(() => {
                    console.log("RD - OnTokenRefresh");
                    this.getFirebaseToken();
                });
            }
        });
    }
    getFirebaseToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = { value: yield this.firebaseMessaging.getToken() };
            this.notifyListeners('registration', token);
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureFirebase();
            try {
                yield this.getFirebaseToken();
            }
            catch (ex) {
                console.error('Unable to get Firebase token', ex);
            }
        });
    }

    // Metodi non implementati
    getDeliveredNotifications() {
        return Promise.reject('Method not implemented.');
    }
    removeDeliveredNotifications() {
        return Promise.reject('Method not implemented.');
    }
    removeAllDeliveredNotifications() {
        return Promise.reject('Method not implemented.');
    }
    createChannel() {
        return Promise.reject('Method not implemented.');
    }
    deleteChannel() {
        return Promise.reject('Method not implemented.');
    }
    listChannels() {
        return Promise.reject('Method not implemented.');
    }
}
const PWAFirebaseMsg = new PWAFirebaseMsgWeb();
export { PWAFirebaseMsg as PushNotifications };
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(PWAFirebaseMsg);
//# sourceMappingURL=web.js.map