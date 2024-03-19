import { convertGMTStringToDate } from "@/lib/utils";
import DialogTranscription from "../TranscriptionDialog";


type AudioDescriptionProps = {
    title: string,
    date: string,
    transcription?: string | null
}

const AudioDescription = async (props: AudioDescriptionProps) => {
    const { title, date, transcription } = props;

    return (
        <div className="flex flex-col h-full max-w-md m-auto md:justify-center gap-8 justify-around">
            <div>
                <p className="text-2xl  text-primary-gradient mt-10 font-semibold">{convertGMTStringToDate(date)}</p>
                <h1 className="text-6xl font-bold text-primary-gradient mb-5 pb-2 break-words mt-2">{title}</h1>
            </div>
            <div>
                {transcription ? <DialogTranscription transcription={transcription} title={title} /> : null}
            </div>

        </div>
    )
}

export default AudioDescription;