import React, { useEffect, useState } from "react";
import TimeIndicator from "@/components/ui/TimeIndicator";
import { numToMinSec } from "@/lib/utils";

type DurationIndicatorProps = {
  audioRef: React.MutableRefObject<HTMLAudioElement | undefined>;
};

function TimeProgressIndicator({ audioRef }: DurationIndicatorProps) {
  const [currentTime, setCurrentTime] = useState(0);

  // Add an event listener to the audio element to update the current time
  useEffect(() => {
    if (!audioRef.current) return;
    // store the audio element in a variable to use in the cleanup function (the ref might change)
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (!audioRef.current) return;
      setCurrentTime(audioRef.current.currentTime);
    };

    // every time the audio element updates, we want to update the current time
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (!audio) return;
      // clean up the event listener when the component unmounts
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef.current]);

  return <TimeIndicator value={numToMinSec(currentTime)} />;
}

export default TimeProgressIndicator;
