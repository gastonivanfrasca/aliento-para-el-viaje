"use client"
import Footer from "@/components/Footer";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import MarkdownContent from "@/components/MarkdownContent";
import {
    ContextReducerProvider,
    reducer,
    initialState,
} from "@/hooks/useContextReducer";

type TranscriptionProps = {
    url: string,
    title: string,
    createdAt: string,
    markdowns: {
        completion: string,
        translation: string,
    },
}

const Transcription = ({
    url,
    title,
    createdAt,
    markdowns,
}: TranscriptionProps) => {
    return (
        <ContextReducerProvider reducer={reducer} initialState={initialState}>
        <main className="flex min-h-screen flex-col items-center justify-between p-8 pb-44">
                <Footer audioURL={url} />
                <Card className="w-screen md:w-full border-none shadow-none">
                    <CardHeader>
                        <CardTitle>{`${title} - ${createdAt}`}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MarkdownContent markdowns={markdowns} />
                    </CardContent>
                </Card>
        </main>
        </ContextReducerProvider>
    );
}

export default Transcription;