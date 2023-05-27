"use client";

import React, { useEffect, useState } from "react";

type VolumeSliderProps = {
  audioRef: React.MutableRefObject<HTMLAudioElement | undefined>;
};

function VolumeSlider({ audioRef }: VolumeSliderProps) {
  const [volume, setVolume] = useState(
    audioRef.current ? audioRef.current.volume : 1
  );

  // When the volume changes, update the audio element's volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  const handleVolumeChange = (e: any) => {
    setVolume(e.target.value);
  };

  return (
    <div className="w-full px-4 py-2">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-full h-1 bg-gray-200 rounded-full focus:outline-none focus:ring-2 appearance-none text-black"
      />
    </div>
  );
}

export default VolumeSlider;
