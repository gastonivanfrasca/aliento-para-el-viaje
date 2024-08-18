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
            <main className="px-10 pt-2 flex-grow pb-[170px]">
                <AudioDescription title={audioOfTheDay.title} date={audioOfTheDay.pubDate} transcription={transcription} playerRef={playerRef} />
            </main>
            <footer className='fixed bottom-0 bg-white'>
                <AudioPlayer url={audioOfTheDay.enclosure["@_url"]} customStyles={{ width: '100vw' }} playerRef={playerRef} />
            </footer>
            <PageTitleSetter title={"Audio del día"} />
        </>
    )
}