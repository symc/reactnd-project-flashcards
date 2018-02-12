import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

/*
    Storage key for notification objects is defined here
*/
const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

/**
* @description clearLocalNotifications
* Clear all local notifications
* @returns {Promise} - Returns a promise after modifying the deck
*/
export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

/**
* @description createNotification
* Create the notification object to be displayed
* @returns {Object} - Returns a notification object
*/
function createNotification() {
    return {
        title: 'Practice!',
        body: "Don't forget to practice your decks!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

/**
* @description setLocalNotification
* Sets a local notification to remind that the user needs to practice
* The function first asks for permission for local notifications, if the
* permission has not been requested yet. If the permission is granted, a
* local notification is created for every day at 17:00, local time
* @returns {Promise} - Returns a promise after creating the notification
*/
export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
        if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync();
                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    tomorrow.setHours(17);
                    tomorrow.setMinutes(0);
                    Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                        time: tomorrow,
                        repeat: 'day',
                    }
                    )
                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                }
            })
        }
    })
}