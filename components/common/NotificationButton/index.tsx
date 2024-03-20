"use client"
import { useEffect, useState } from 'react'
import { MdNotifications, MdNotificationsOff } from 'react-icons/md'
import SwitchWithIcons from '../SwitchWithIcons';
import { logPayloadFromClient } from '@/lib/utils';

const base64ToUint8Array = (base64: any) => {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4)
    const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(b64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}


const NotificationButton = () => {
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isSupported, setIsSupported] = useState(false)

    async function subscribeUser(): Promise<void> {
        // Verificar si el navegador soporta notificaciones y Service Workers
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                const sw = await navigator.serviceWorker.ready;
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    return;
                }

                const subscription = await sw.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_VAP_PUB)
                });

                await fetch('/api/push-subs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(subscription)
                });
                setIsSubscribed(true);

            } catch (err) {
                logPayloadFromClient(err, 'Error al suscribirse', 'error')
            }
        } else {
            logPayloadFromClient(null, 'Service Worker no soportado', 'error')
        }
    }

    async function unsubscribeUser(): Promise<void> {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                const sw = await navigator.serviceWorker.ready;
                const subscription = await sw.pushManager.getSubscription();

                if (subscription) {
                    await subscription.unsubscribe();
                    await fetch('/api/push-subs', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(subscription)
                    });
                }

                console.log('unsubscribed');
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
        //@ts-ignore
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
            navigator.serviceWorker.ready.then(reg => {
                reg.pushManager.getSubscription().then(sub => {
                    if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
                        setIsSubscribed(true)
                    }
                })
            })
        }

    }, [])

    if (!isSupported) {
        return null
    }


    return (
        <SwitchWithIcons
            onCheckedChange={isSubscribed ? () => unsubscribeUser() : () => subscribeUser()}
            leftIcon={<MdNotificationsOff size={20} className={isSubscribed ? 'text-primary' : 'text-gray'} />}
            rightIcon={<MdNotifications size={20} className={isSubscribed ? 'text-primary' : 'text-gray'} />}
            checked={isSubscribed}
            text='Notificaciones'
        />
    )
}

export default NotificationButton