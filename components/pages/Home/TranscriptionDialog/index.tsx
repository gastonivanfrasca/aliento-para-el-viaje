"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IoMdBook } from 'react-icons/io'
import va from '@vercel/analytics';


const DialogTranscription = ({ transcription, title }: { transcription: string, title: string }) => {
    return (
        <Dialog>
            <DialogTrigger
                className="mt-4 text-white p-2 bg-gradient-to-r from-primary to-primaryLight rounded-md"
            > <div className="flex flex-row items-center gap-2" onClick={() => va.track('reads audio')}><IoMdBook />Leer audio</div></DialogTrigger>
            <DialogContent className="overflow-scroll bg-white m-0 max-w-[93%] max-h-[90vh] border-none shadow-md" style={{ borderBottom: "30px solid white", borderTop: "30px solid white" }}>
                <DialogHeader>
                    <DialogTitle className="p-2 text-xl text-left font-bold">{title}</DialogTitle>
                    <DialogDescription className="p-2 text-xl text-left">
                        {transcription}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DialogTranscription;