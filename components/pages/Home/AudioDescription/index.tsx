import { convertGMTStringToDate } from "@/lib/utils";
import AwarenessMessage from "../AwarenessMessage";

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
                <h1 className="text-6xl font-bold  bg-gradient-to-r from-primary to-primaryLight bg-clip-text text-transparent">{title}</h1>
                <p className="text-2xl  text-primary mt-10">{convertGMTStringToDate(date)}</p>
            </div>
            <AwarenessMessage />
        </div>
    )
}

export default AudioDescription;