import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

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

  const handleRewind = () => {
    playerRef.current?.seekTo(progress.playedSeconds - 10);
  };

  const handleForward = () => {
    playerRef.current?.seekTo(progress.playedSeconds + 10);
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
        width="100%"
        height="50px"
        controls={false}
      />
      <div>
        <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleRewind}>Rewind 10s</button>
        <button onClick={handleForward}>Forward 10s</button>
        <div onClick={handleSeek} style={{ position: 'relative', height: '5px', background: '#ccc' }}>
          <div style={{ position: 'absolute', width: `${progress.played * 100}%`, height: '100%', background: '#000' }} />
        </div>
        <div>
          <span>Time: {formatTime(progress.playedSeconds)}</span>
          <span> / Duration: {formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

