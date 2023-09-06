import { convertGMTStringToDate } from "@/lib/utils";
import AwarenessMessage from "../AwarenessMessage";
import { onDevEnv } from "@/lib/utils";
import { get } from '@vercel/edge-config';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IoMdBook } from 'react-icons/io'
import DialogTranscription from "../TranscriptionDialog";


type AudioDescriptionProps = {
    title: string,
    date: string,
    transcription?: string
}

const AudioDescription = async (props: AudioDescriptionProps) => {
    const { title, date, transcription } = props;
    const showTranscription = true

    return (
        <div className="flex flex-col h-full max-w-md m-auto md:justify-center gap-8">
            <div>
                <p className="mb-2 text-xl">Título</p>
                <h1 className="text-6xl font-bold  bg-gradient-to-r from-primary to-primaryLight bg-clip-text text-transparent">{title}</h1>
                {showTranscription && transcription && <DialogTranscription transcription={transcription} title={title} />}
                <p className="text-2xl  text-primary mt-10">{convertGMTStringToDate(date)}</p>
            </div>
            <AwarenessMessage />
        </div>
    )
}

export default AudioDescription;