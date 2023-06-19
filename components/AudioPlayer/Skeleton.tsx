import { Skeleton } from "@/components/ui/skeleton";
import TimeIndicator from "@/components/ui/TimeIndicator";
import { numToMinSec } from "@/lib/utils";

const AudioPlayerSkeleton = () => {
  return (
    <div>
      <div className="flex md:grid md:grid-cols-[10fr_2fr] place-items-center justify-items-center mb-4 md:mt-4">
        <div className="grid grid-rows-1 grid-cols-3 md:grid-rows-1 place-items-center w-screen md:w-96 gap-32 md:gap-16 justify-items-center">
          <Skeleton className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 px-3 row-start-1 col-start-1 col-end-4 w-16 h-16 rounded-full" />
          <Skeleton className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground px-3 row-start-1 row-span-1 col-start-2 col-span-2 w-14 h-14 md:w-12 md:h-12 rounded-full md:row-start-1 md:row-span-1 bg-slate-200" />
          <Skeleton className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground px-3 row-start-1 row-span-1 col-start-1 col-span-2 w-14 h-14 rounded-full md:row-start-1 md:row-span-1 bg-slate-200" />
        </div>
      </div>
      <Skeleton className="w-full h-2  rounded-md mb-2" data-testid="progress-bar-skeleton" />
      <div className="flex justify-between">
        <TimeIndicator value={numToMinSec(0)} />
        <TimeIndicator value={numToMinSec(0)} />
      </div>
    </div>
  );
};

export default AudioPlayerSkeleton;
