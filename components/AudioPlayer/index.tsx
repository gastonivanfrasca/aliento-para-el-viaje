"use client";

import { useEffect, useRef, useState } from "react";
import AudioPlayerSkeleton from "./Skeleton";
import ForwardButton from "../FowardButton";
import PlayButton from "@/components/PlayButton";
import ProgressBar from "../ProgressSlider";
import RewindButton from "../RewindButton";
import MenuSheet from "../MenuSheet";
import TimeIndicator from "@/components/ui/TimeIndicator";
import TimeProgressIndicator from "@/components/TimeProgressIndicator";
import VolumeSlider from "../VolumeSlider";
import useDeviceDetect from "@/hooks/useDeviceDetection";
import { numToMinSec } from "@/lib/utils";
import { useContextReducerState } from "@/hooks/useContextReducer";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>();
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [duration, setDuration] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const mobile = useDeviceDetect();
  const { audioURL } = useContextReducerState();

  useEffect(() => {
    if (!audio) return;
    if (audioURL) {
      audio.src = audioURL;
      audio.load();
      if (audio?.currentTime === 0) {
        audioRef?.current?.pause();
      }
    }
    return () => {
      if (!audio) return;
      audio.removeEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
    }
  }, [audioURL])


  // Fetches the audio file and create an audio element and set duration
  useEffect(() => {
    createAudio(audioURL)
      .then((audio) => {
        setAudio(audio);
        if (!duration) {
          audio.addEventListener("loadedmetadata", () => {
            setDuration(audio.duration);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      if (!audio) return;
      audio.removeEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
    };
  }, [audioURL]);

  // Sets the audioRef to the audio element
  useEffect(() => {
    if (audio) {
      audioRef.current = audio;
      setShowPlayer(true);
      setDuration(audio.duration);
    }
  }, [audio]);

  return (
    <div>
      {/* show the audio player only when the ref is setted */}
      {showPlayer ? (
        <div>
          <div className="flex md:grid md:grid-cols-[10fr_2fr] place-items-center justify-items-center mb-4 md:mt-4">
            <div className="grid grid-rows-1 grid-cols-[1fr_11fr] w-full place-items-center">
              <MenuSheet />
              <div className="grid grid-rows-1 grid-cols-3 md:grid-rows-1 place-items-center w-screen md:w-96 gap-8 md:gap-16 justify-items-center">
                <PlayButton audioRef={audioRef} />
                <ForwardButton audioRef={audioRef} />
                <RewindButton audioRef={audioRef} />
              </div>
            </div>
            {!mobile && <VolumeSlider audioRef={audioRef} />}
          </div>
          <ProgressBar audioRef={audioRef} />
          <div className="flex justify-between">
            <TimeProgressIndicator audioRef={audioRef} />
            <TimeIndicator
              value={duration ? numToMinSec(duration) : numToMinSec(0)}
            />
          </div>
        </div>
      ) : (
        <AudioPlayerSkeleton />
      )}
    </div>
  );
};

const createAudio = async (fetchUrl: string) => {
  const audio = new Audio(fetchUrl);
  return audio;
};

export default AudioPlayer;
