"use client";

type StopButtonProps = {
  audioRef: React.MutableRefObject<HTMLAudioElement | undefined>;
};

const StopButton = ({ audioRef }: StopButtonProps) => {
  function handleStop() {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
      onClick={handleStop}
    >
      Stop
    </button>
  );
};

export default StopButton;
