import { useState, useEffect, useRef, useMemo } from 'react';
import ReactPlayer from 'react-player';

interface Subtitle {
  id: number;
  start: number;
  end: number;
  text: string;
}

interface AudioSyncProps {
  srtData: string;
  playerRef: React.RefObject<ReactPlayer>;
}

const AudioSync: React.FC<AudioSyncProps> = ({ srtData, playerRef }) => {
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState<number>(-1);
  const transcriptionRef = useRef<HTMLDivElement>(null);

  const parseSRT = (srtText: string): Subtitle[] => {
    const subtitles: Subtitle[] = [];
    const blocks = srtText.trim().split(/\n\s*\n/);

    blocks.forEach(block => {
      const lines = block.split('\n');
      if (lines.length >= 3) {
        const id = parseInt(lines[0]);
        const [start, end] = lines[1].split(' --> ').map(timeToSeconds);
        const text = lines.slice(2).join(' ');
        subtitles.push({ id, start, end, text });
      }
    });

    return subtitles;
  };

  const timeToSeconds = (timeString: string): number => {
    const [time, milliseconds] = timeString.split(',');
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds + Number(milliseconds) / 1000;
  };

  const subtitles = useMemo(() => parseSRT(srtData), [srtData]);

  useEffect(() => {
    const updateTranscription = () => {
      const player = playerRef.current;
      if (!player) return;

      const currentTime = player.getCurrentTime();
      const index = subtitles.findIndex(sub => currentTime >= sub.start && currentTime <= sub.end);
      setCurrentSubtitleIndex(index);
    };

    const intervalId = setInterval(updateTranscription, 100);
    return () => clearInterval(intervalId);
  }, [subtitles, playerRef]);

  useEffect(() => {
    if (currentSubtitleIndex !== -1 && transcriptionRef.current) {
      const currentSubtitle = transcriptionRef.current.querySelector('.current');
      if (currentSubtitle) {
        currentSubtitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentSubtitleIndex]);

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
      <div
        ref={transcriptionRef}
        className="h-80 overflow-y-auto p-4 border border-gray-200 rounded-lg"
      >
        {subtitles.map((subtitle, index) => (
          <div
            key={subtitle.id}
            className={`transition-all duration-300 ease-in-out mb-3 p-2 rounded ${index === currentSubtitleIndex
                ? 'font-bold text-blue-600 bg-blue-100'
                : index === currentSubtitleIndex + 1
                  ? 'opacity-70'
                  : index < currentSubtitleIndex
                    ? 'opacity-50'
                    : ''
              }`}
          >
            {subtitle.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioSync;