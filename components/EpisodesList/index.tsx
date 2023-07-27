"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Footer from "../Footer";
import {
    ContextReducerProvider,
    reducer,
    initialState,
    useContextReducerDispatch,
    ACTIONS
} from "@/hooks/useContextReducer";
import { useEffect, useState } from "react";

type AudioListProps = {
    audioList: AudioMetadata[];
}

type AudioMetadata = {
    title: string;
    url: string;
    createdAt: string;
}


const AudioList = ({ audioList }: AudioListProps) => {
    return (
        <ContextReducerProvider reducer={reducer} initialState={initialState}>
            <List audioList={audioList} />
        </ContextReducerProvider>
    )
}


const List = ({ audioList }: AudioListProps) => {
    const [selectedAudioIndex, setSelectedAudioIndex] = useState(0)
    const dispatch = useContextReducerDispatch()
    useEffect(() => {
        dispatch({ type: ACTIONS.SET_AUDIO_URL, payload: audioList[selectedAudioIndex].url })
    }, [selectedAudioIndex])
    return (
        <>
            <ul>
                {audioList.map((audio, index) => {
                    return (

                        <Card key={index} onClick={() => setSelectedAudioIndex(index)}
                            className={index === selectedAudioIndex ? `bg-black text-white` : "bg-inherit"}>
                            <CardHeader>
                                <CardTitle>{audio.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{audio.createdAt}</CardDescription>
                            </CardContent>
                        </Card>
                    )
                })}

            </ul>
            <Footer />
        </>
    )
}

export default AudioList