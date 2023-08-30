import { Alert, AlertTitle } from "@/components/ui/alert"
import { GiPartyPopper } from "react-icons/gi"
import { convertGMTStringToDate } from "@/lib/utils";

type AudioDescriptionProps = {
    title: string,
    date: string,
}

const AudioDescription = (props: AudioDescriptionProps) => {
    const { title, date } = props;
    return (
        <div className="flex flex-col h-full max-w-md m-auto md:justify-center gap-8">
            <div>
                <p className="mb-2 text-xl">Título</p>
                <h1 className="text-6xl font-bold text-primary">{title}</h1>
                <p className="text-2xl  text-primary mt-10">{convertGMTStringToDate(date)}</p>
            </div>
            <Alert className="w-50">
                <GiPartyPopper size={20} />
                <AlertTitle>Estamos renovando la web de Aliento para el viaje</AlertTitle>
            </Alert>
        </div>
    )
}

export default AudioDescription;