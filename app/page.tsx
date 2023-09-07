import AudioPlayer from "@/components/common/AudioPlayer"
import AudioDescription from "@/components/pages/Home/AudioDescription"
import { getLatestEpisode } from "@/lib/rss"
import { Episode } from "@/lib/rss/types";
import { kv } from "@vercel/kv";
import { convertGMTStringToDate } from "@/lib/utils";

const AUDIO_OF_THE_DAY_KEY = 'audioOfTheDay'

const isWeekend = () => {
  const today = new Date().getDay()
  return today === 6 || today === 0
}

const getAudioOfTheDay = async (): Promise<Episode> => {
  const storedAudio = await kv.get(AUDIO_OF_THE_DAY_KEY) as Episode
  const storedAudioDate = convertGMTStringToDate(storedAudio.pubDate)
  const currentDate = convertGMTStringToDate(new Date().toDateString())
  if (storedAudioDate === currentDate || isWeekend()) {
    return storedAudio
  } else {
    const audioOfTheDay = await getLatestEpisode()
    return audioOfTheDay
  }
}

export default async function Home() {
  const audioOfTheDay = await getAudioOfTheDay()
  const transcription = await kv.get('transcription') as string
  return (
    <>
      <main className="px-10 py-8" style={{ height: 'calc(100vh - 220px)' }}>
        <AudioDescription title={audioOfTheDay.title} date={audioOfTheDay.pubDate} transcription={transcription} />
      </main>
      <footer className='absolute'>
        <AudioPlayer url={audioOfTheDay.enclosure["@_url"]} customStyles={{ width: '100vw' }} />
      </footer>
    </>
  )
}
