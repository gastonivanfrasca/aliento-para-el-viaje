"use client";
import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import ButtonRound from '../ButtonRound';
import { RoundedButtonSizes } from '@/types/button';
import { Colors } from '@/types/colors';
import { getLatestEpisode } from '@/lib/rss';
import { ACTIONS, useContextReducerDispatch } from '@/hooks/useContextReducer';

interface AudioPlayerProps {
  url: string;
  customStyles?: React.CSSProperties;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url, customStyles }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState({ played: 0, playedSeconds: 0, loaded: 0, loadedSeconds: 0 });
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleStop = () => {
    setPlaying(false);
    playerRef.current?.seekTo(0);
  };

  const handleShare = () => {
    navigator.share({
      title: 'Aliento para el viaje',
      text: 'Escucha el audio del día de Aliento para el viaje',
      url: "https://alientoparaelviaje.com",
    });
  };

  const handleProgress = (p: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    setProgress(p);
  };

  const handleDuration = (d: number) => {
    setDuration(d);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const newProgress = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * duration;
    playerRef.current?.seekTo(newProgress);
  };

  return (
    <div style={customStyles}>
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="100vw"
        height="0px"
        controls={false}
      />
      <div>
        <div onClick={handleSeek} style={{ position: 'relative', height: '20px', background: Colors.gray }}>
          <div style={{ position: 'absolute', width: `${progress.played * 100}%`, height: '100%', background: Colors.primary }} />
        </div>
        <div className='flex justify-center items-center m-5 gap-3'>
          <span className='text-xl'>{formatTime(progress.playedSeconds)}</span>
          <ButtonRound
            onClick={handleStop}
            icon='stop'
            type={RoundedButtonSizes.medium}
            dark />
          <ButtonRound
            icon={playing ? 'pause' : 'play'}
            type={RoundedButtonSizes.large}
            dark
            onClick={handlePlayPause} />
          <ButtonRound
            icon='share'
            type={RoundedButtonSizes.medium}
            dark
            onClick={handleShare} />
          <span className='text-xl'>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};


export default AudioPlayer;

