import { WebPlugin } from '@capacitor/core';
import '@firebase/messaging';
import { PushNotificationsPlugin, PushNotificationDeliveredList } from '@capacitor/core/dist/esm/core-plugin-definitions';
export declare class PWAFirebaseMsgWeb extends WebPlugin implements PushNotificationsPlugin {
    private promiseFirebase;
    private firebaseMessaging;
    constructor();
    listChannels(): Promise<import("@capacitor/core").NotificationChannelList>;
    requestPermission(): Promise<import("@capacitor/core").NotificationPermissionResponse>;
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
    private ensureFirebase;
    private initializeFirebase;
    private getFirebaseToken;
    register(): Promise<void>;
    getDeliveredNotifications(): Promise<PushNotificationDeliveredList>;
    removeDeliveredNotifications(): Promise<void>;
    removeAllDeliveredNotifications(): Promise<void>;
    createChannel(): Promise<void>;
    deleteChannel(): Promise<void>;
    //listChannels(): Promise<PushNotificationChannelList>;
}
declare const PWAFirebaseMsg: PWAFirebaseMsgWeb;
export { PWAFirebaseMsg as PushNotifications };
