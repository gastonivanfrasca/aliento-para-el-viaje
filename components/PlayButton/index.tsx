"use client";

import { Pause, Play } from "lucide-react";

import { Button } from "../ui/button";
import { useState } from "react";

type PlayButtonProps = {
  audioRef: React.MutableRefObject<HTMLAudioElement | undefined>;
};

const PlayButton = ({ audioRef }: PlayButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlayPause() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <Button
      variant={"defaultRounded"}
      size={"sm"}
      onClick={handlePlayPause}
      className=" row-start-1 row-span-1 col-start-1 col-end-4 w-20 h-20 md:w-12 md:h-12 rounded-full"
    >
      {isPlaying ? <Pause color="white" size={12} /> : <Play color="white" size={12} />}
    </Button>
  );
};

export default PlayButton;
