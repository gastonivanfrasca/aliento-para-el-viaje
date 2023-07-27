"use client";

import React, { useEffect, useState } from "react";

type AudioProgressBarTypes = {
  audioRef: React.MutableRefObject<HTMLAudioElement | undefined>;
};

function ProgressBar({ audioRef }: AudioProgressBarTypes) {
  const [progress, setProgress] = useState(0);

  // Add an event listener to the audio element to update the percentage of the audio already played
  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (!audioRef.current) return;
      const percentage =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percentage);
    };

    if (!audioRef.current) return;
    // every time the audio element updates, we want to update the current time
    audioRef.current.addEventListener("timeupdate", updateProgress);
    return () => {
      if (!audio) return;
      audio.removeEventListener("timeupdate", updateProgress);
      setProgress(0);
    };
  }, [audioRef.current]);

  const handleClick = (e: any) => {
    // get information about the size and position of the bar
    const rect = e.target.getBoundingClientRect();
    // get the x position of the click relative to the bar
    const x = e.clientX - rect.left;
    // calculate the percentage of the click relative to the bar width
    const percentage = (x / rect.width) * 100;

    if (!audioRef.current) return;
    // calculate the new time based on the percentage
    const newTime = (audioRef.current.duration * percentage) / 100;
    // set the audio element's current time to the new time
    audioRef.current.currentTime = newTime;
  };

  return (
    <div
      className="w-full h-2 bg-gray-300 cursor-pointer rounded-md mb-2"
      onClick={handleClick}
      style={{ position: "relative" }}
    >
      <div
        className="h-2 bg-black rounded-md"
        style={{ width: `${progress}%`, position: "absolute", top: 0, left: 0 }}
      ></div>
    </div>
  );
}

export default ProgressBar;
