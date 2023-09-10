"use client"
import { useEffect, useState } from 'react'
import { MdNotifications, MdNotificationsOff } from 'react-icons/md'
import va from '@vercel/analytics';
import { Switch } from '@/components/ui/switch';

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
                    va.track('userDeniedNotifications');
                    return;
                }

                va.track('userAcceptedNotifications');
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
        <button onClick={isSubscribed ? () => unsubscribeUser() : () => subscribeUser()} className='flex flex-row gap-2 items-center' >
            <MdNotificationsOff size={20} className={isSubscribed ? 'text-primary' : 'text-gray'} />
            <Switch onCheckedChange={isSubscribed ? () => unsubscribeUser() : () => subscribeUser()} checked={isSubscribed} />
            <MdNotifications size={20} className={isSubscribed ? 'text-primary' : 'text-gray'} />
            <p className='text-primary font-bold'>Notificaciones</p>
        </button>
    )
}

export default NotificationButton