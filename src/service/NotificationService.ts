import { getToken } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";
import { app } from "./FirebaseApp";
import { VAPID_MESSAGING_KEY } from "../utils/config";
import { registrationTokenStore } from "../stores/fcmToken";

const messaging = getMessaging(app);

export function loadFcmToken() {
    getToken(messaging, { vapidKey: VAPID_MESSAGING_KEY }).then((currentToken) => {
        if (currentToken) {
            console.log(currentToken);

            registrationTokenStore.set(currentToken);
        } else {
            console.log('No registration token available. Request permission to generate one.');

            requestPermissions();
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        requestPermissions();
    });
}

function requestPermissions() {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            loadFcmToken();
        } else {
            console.warn('Notification permission denied.');
        }
    });
}