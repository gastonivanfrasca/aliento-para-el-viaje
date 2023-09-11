"use client"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GiPartyPopper } from "react-icons/gi"


const AwarenessMessage = () => {    
    return (<Alert className="w-50">
        <GiPartyPopper size={20} />
        <AlertDescription>¡Ahora puedes recibir una notificación cuando un nuevo audio este disponible! Actívalo desde el menu lateral. </AlertDescription>
    </Alert>)
}

export default AwarenessMessage;