"use client";

import React from 'react';
import AudioPlayer from "@/components/common/AudioPlayer"
import AudioDescription from "@/components/pages/Home/AudioDescription"
import PageTitleSetter from "@/components/common/PageTitleSetter";

export type AudioProps = {
    audioOfTheDay: any,
    transcription: any
}

export default function HomeAudio({ audioOfTheDay, transcription }: AudioProps) {
    const playerRef = React.useRef(null);
    return (
        <>
            <main className="px-10 pb-8 pt-2 flex-grow">
                <AudioDescription title={audioOfTheDay.title} date={audioOfTheDay.pubDate} transcription={transcription} playerRef={playerRef} />
            </main>
            <footer>
                <AudioPlayer url={audioOfTheDay.enclosure["@_url"]} customStyles={{ width: '100vw' }} playerRef={playerRef} />
            </footer>
            <PageTitleSetter title={"Audio del día"} />
        </>
    )
}