"use client"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { useEffect, useState } from "react"
import { GiPartyPopper } from "react-icons/gi"
import va from '@vercel/analytics';


const AwarenessMessage = () => {
    const [message, setMessage] = useState(<></>);
    useEffect(() => {
        IsAppInstalled(window).then((isInstalled) => {
            if (!isInstalled) {
                window.addEventListener("beforeinstallprompt", (event) => {
                    event.preventDefault();
                    const handleInstall = () => {
                        // @ts-ignore
                        event.prompt();
                        va.track('clickedOnInstall');
                        // @ts-ignore
                        event.userChoice.then((choiceResult) => {
                            if (choiceResult.outcome === 'accepted') {
                                va.track('userInstalled');
                            } else {
                                va.track('userDecidedNotToInstall');
                            }
                        });
                    }
                    setMessage(
                        <AlertDescription>¡Ahora puedes tener la app! <button onClick={() => handleInstall()}><span className="underline font-bold">Instalar</span></button> </AlertDescription>
                    )
                });
            };
        });

    }, [])
    return (<Alert className="w-50">
        <GiPartyPopper size={20} />
        <AlertTitle>Estamos renovando la web de Aliento para el viaje</AlertTitle>
        {message}
    </Alert>)
}


const IsAppInstalled = async (window: Window) => {
    if (window.navigator.userAgent.includes('Chrome')) {
        // @ts-ignore
        const relatedApps = await window.navigator.getInstalledRelatedApps();
        return relatedApps.length > 0;
    } else {
        return window.matchMedia('(display-mode: standalone)').matches;
    }


}

export default AwarenessMessage;