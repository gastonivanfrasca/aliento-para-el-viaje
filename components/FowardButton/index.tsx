"use client";

import { Button } from "@/components/ui/button";
import { FastForward } from "lucide-react";

type ForwardButtonProps = {
  audioRef: React.MutableRefObject<HTMLAudioElement | undefined>;
  seconds?: number;
};

const ForwardButton = ({ audioRef, seconds = 10 }: ForwardButtonProps) => {
  function handleForward() {
    if (!audioRef.current) return;
    audioRef.current.currentTime += seconds;
  }

  return (
    <Button
      variant={"outline"}
      size={"sm"}
      onClick={handleForward}
      className=" row-start-1 row-span-1 col-start-2 col-span-2 w-14 h-14 md:w-12 md:h-12 rounded-full md:row-start-1 md:row-span-1 bg-slate-200"
    >
      <FastForward color="black" size={14} />
    </Button>
  );
};

export default ForwardButton;
