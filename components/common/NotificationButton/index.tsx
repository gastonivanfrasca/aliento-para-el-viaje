"use client"
import { useEffect, useState } from 'react'
import { MdNotifications } from 'react-icons/md'
import va from '@vercel/analytics';
import { Switch } from '@/components/ui/switch';

const NotificationButton = () => {
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isSupported, setIsSupported] = useState(false)

    async function subscribeUser(): Promise<void> {
        // Verificar si el navegador soporta notificaciones y Service Workers
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                console.log('service worker in navigator and push manager in window')
                const sw = await navigator.serviceWorker.ready;
                console.log('service worker ready')
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    va.track('userDeniedNotifications');
                    return;
                }

                va.track('userAcceptedNotifications');
                const subscription = await sw.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: process.env.NEXT_PUBLIC_VAP_PUB
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
        navigator.serviceWorker.ready.then(function (registration) {
            registration.pushManager.getSubscription().then(function (subscription) {
                if (subscription) {
                    setIsSubscribed(true);
                } else {
                    setIsSubscribed(false);
                }
            });
        });

    }, [isSubscribed])

    if (!isSupported) {
        return null
    }


    return (
        <button onClick={isSubscribed ? () => unsubscribeUser() : () => subscribeUser()} className='flex flex-row gap-2 items-center' >
            <Switch onCheckedChange={isSubscribed ? () => unsubscribeUser() : () => subscribeUser()} checked={isSubscribed} />
            <MdNotifications size={20} className={isSubscribed ? 'text-primaryLight' : 'text-gray'} />
            <p className='text-primaryLight font-bold'>Notificaciones</p>
        </button>
    )
}

export default NotificationButton