"use client"
import { useEffect, useState } from 'react'
import va from '@vercel/analytics';
import { MdInstallMobile } from 'react-icons/md';


const IsAppInstalled = async (window: Window) => {
    if (window.navigator.userAgent.includes('Chrome')) {
        // @ts-ignore
        const relatedApps = await window.navigator.getInstalledRelatedApps();
        return relatedApps.length > 0;
    } else {
        return window.matchMedia('(display-mode: standalone)').matches;
    }
}

const InstallButton = () => {
    const [button, setButton] = useState<JSX.Element | null>(null)

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
                    setButton(
                        <button onClick={() => handleInstall()}>
                            <div className="font-bold text-primary flex flex-row gap-2 items-center outline p-4 outline-warmGray-700 rounded-lg">
                                <MdInstallMobile /> Instalar como app
                            </div>
                        </button>
                    )
                });
            } else {
                setButton(null)
            }
        });
    }, [])

    return (
        <>
            {button}
        </>
    )
}


export default InstallButton

