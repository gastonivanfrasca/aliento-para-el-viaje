"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import va from '@vercel/analytics';


const DialogTranscription = ({ transcription, title }: { transcription: string, title: string }) => {
    return (
        <Dialog>
            <DialogTrigger
                className="p-4 border-primary-gradient rounded-md w-full "
            > <div className="flex flex-row items-center gap-2 justify-center text-xl text-primary-gradient font-medium" onClick={() => va.track('reads audio')}>Texto del audio</div></DialogTrigger>
            <DialogContent className="overflow-scroll bg-white m-0 max-w-[99%] max-h-[96vh] border-none shadow-md md:w-screen" style={{ borderBottom: "5px solid white", borderTop: "5px solid white" }}>
                <DialogHeader>
                    <DialogTitle className="p-2 text-xl text-left font-bold">{title}</DialogTitle>
                    <DialogDescription className="p-2 text-lg text-left md:p-8 md:px-40 font-normal">
                        {transcription}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DialogTranscription;