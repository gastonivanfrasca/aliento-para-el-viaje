"use client";

import {Button} from "@/components/ui/button";
import { Rewind } from "lucide-react";

type RewindButtonProps = {
  audioRef: React.MutableRefObject<HTMLAudioElement | undefined>;
  seconds?: number;
};

const RewindButton = ({ audioRef, seconds = 10 }: RewindButtonProps) => {
  function handleRewind() {
    if (!audioRef.current) return;
    audioRef.current.currentTime -= seconds;
  }

  return (
    <Button
    variant={"outline"}
    size={"sm"}
    onClick={handleRewind}
    className=" row-start-1 row-span-1 col-start-1 col-span-2 w-14 h-14 rounded-full md:row-start-1 md:row-span-1 bg-slate-200"
  >
    <Rewind color="black" size={12} />
  </Button>
  );
};

export default RewindButton;
