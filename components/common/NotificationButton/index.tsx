"use client"
import { use, useEffect, useState } from 'react'
import { MdNotifications } from 'react-icons/md'
import va from '@vercel/analytics';

const NotificationButton = () => {
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isSupported, setIsSupported] = useState(false)

    async function subscribeUser(): Promise<void> {
        console.log('subscribeUser');
        // Verificar si el navegador soporta notificaciones y Service Workers
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                console.log('service worker in navigator and push manager in window')
                const sw = await navigator.serviceWorker.ready;
                console.log('service worker ready')
                const permission = await Notification.requestPermission();
                console.log('perimision requested')
                if (permission !== 'granted') {
                    va.track('userDeniedNotifications');
                    return;
                }

                va.track('userAcceptedNotifications');
                const subscription = await sw.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: process.env.NEXT_PUBLIC_VAP_PUB
                });

                await fetch('/push-subs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(subscription)
                });
                console.log('subscribed');
                setInLocalStorageSubscriptionToPushStatus(true);
                setIsSubscribed(true);

            } catch (err) {
                console.log('Error al suscribirse', err);
            }
        } else {
            console.log('Service Worker no soportado');
        }
    }

    async function unsubscribeUser(): Promise<void> {
        console.log('unsubscribeUser');
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                const sw = await navigator.serviceWorker.ready;
                const subscription = await sw.pushManager.getSubscription();
    
                if (subscription) {
                    await subscription.unsubscribe();
                    await fetch('/push-subs', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(subscription)
                    });
                }
                
                console.log('unsubscribed');
                setInLocalStorageSubscriptionToPushStatus(false);
                setIsSubscribed(false);
            } catch (err) {
                console.log('Error al desuscribirse', err);
            }

        }
    }

    useEffect(() => {
        const userDeviceSupportsNotifications = () => {
            if (typeof window !== 'undefined') {
                return 'serviceWorker' in navigator && 'PushManager' in window
            }
            return false
        }
        setIsSupported(userDeviceSupportsNotifications())
    }, [isSupported])

    useEffect(() => {
        const checkIfUserHasNotificationsEnabled = () => {
            if (typeof window !== 'undefined') {
                return Notification.permission === 'granted'
            }
            return false
        }
        const subscriptionToPush = JSON.parse(localStorage.getItem('subscriptionToPush') || 'false')
        setIsSubscribed(checkIfUserHasNotificationsEnabled() && subscriptionToPush)

    }, [isSubscribed])

    if (!isSupported) {
        return null
    }


    return (
        <button onClick={isSubscribed ? () => unsubscribeUser() : () => subscribeUser()} >
            <MdNotifications size={20} className={isSubscribed ? 'text-primary' : 'text-gray'} />
        </button>
    )
}


const setInLocalStorageSubscriptionToPushStatus = (status: boolean) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('subscriptionToPush', JSON.stringify(status))
    }
}

export default NotificationButton