import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactPlayer from 'react-player';

interface Subtitle {
  id: number;
  start: number;
  end: number;
  text: string;
}

interface GroupedSubtitle {
  id: number;
  start: number;
  end: number;
  text: string;
  originalIndices: number[];
}

interface AudioSyncProps {
  srtData: string;
  playerRef: React.RefObject<ReactPlayer>;
}

const AudioSync: React.FC<AudioSyncProps> = ({ srtData, playerRef }) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState<number>(-1);
  const transcriptionRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const groupSubtitles = (subtitles: Subtitle[]): GroupedSubtitle[] => {
    const grouped: GroupedSubtitle[] = [];
    let currentGroup: GroupedSubtitle | null = null;
    const punctuationRegex = /[.!?]+/;

    subtitles.forEach((subtitle, index) => {
      if (!currentGroup) {
        currentGroup = {
          id: subtitle.id,
          start: subtitle.start,
          end: subtitle.end,
          text: subtitle.text,
          originalIndices: [index]
        };
      } else {
        const combinedText = currentGroup.text + ' ' + subtitle.text;
        if (punctuationRegex.test(currentGroup.text.slice(-1)) || combinedText.length > 200) {
          grouped.push(currentGroup);
          currentGroup = {
            id: subtitle.id,
            start: subtitle.start,
            end: subtitle.end,
            text: subtitle.text,
            originalIndices: [index]
          };
        } else {
          currentGroup.end = subtitle.end;
          currentGroup.text = combinedText;
          currentGroup.originalIndices.push(index);
        }
      }
    });

    if (currentGroup) {
      grouped.push(currentGroup);
    }

    return grouped;
  };

  const groupedSubtitles = useMemo(() => groupSubtitles(subtitles), [subtitles]);

  useEffect(() => {
    groupRefs.current = groupRefs.current.slice(0, groupedSubtitles.length);
  }, [groupedSubtitles]);

  useEffect(() => {
    const updateTranscription = () => {
      const player = playerRef.current;
      if (!player) return;

      const currentTime = player.getCurrentTime();
      const index = groupedSubtitles.findIndex(group => currentTime >= group.start && currentTime <= group.end);
      setCurrentGroupIndex(index);
    };

    const intervalId = setInterval(updateTranscription, 100);
    return () => clearInterval(intervalId);
  }, [groupedSubtitles, playerRef]);

  useEffect(() => {
    if (currentGroupIndex !== -1 && transcriptionRef.current) {
      const container = transcriptionRef.current;
      const currentGroup = groupRefs.current[currentGroupIndex];

      if (currentGroup) {
        const containerRect = container.getBoundingClientRect();
        const groupRect = currentGroup.getBoundingClientRect();

        const targetScrollTop = container.scrollTop + (groupRect.top - containerRect.top) - (containerRect.height / 2) + (groupRect.height / 2);

        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      }
    }
  }, [currentGroupIndex]);

  return (
    <div className="w-full max-w-2xl bg-white p-4 rounded-xl shadow-lg">
      <div
        ref={transcriptionRef}
        className="h-80 overflow-y-auto p-4 rounded-lg relative"
      >
        <div className="absolute left-0 right-0 h-8 top-1/2 -mt-4 opacity-50 pointer-events-none" />
        {groupedSubtitles.map((group, index) => (
          <div
            key={group.id}
            //@ts-ignore
            ref={el => groupRefs.current[index] = el}
            className={`transition-all duration-300 ease-in-out mb-3 p-2 rounded ${index === currentGroupIndex
                ? 'font-bold text-primary-gradient'
                : index === currentGroupIndex + 1
                  ? 'opacity-70'
                  : index < currentGroupIndex
                    ? 'opacity-50'
                    : ''
              }`}
          >
            {group.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioSync;