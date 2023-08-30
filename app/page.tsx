import AudioPlayer from "@/components/common/AudioPlayer"
import AudioDescription from "@/components/pages/Home/AudioDescription"
import { getLatestEpisode } from "@/lib/rss"
import { Episode } from "@/lib/rss/types";
import { kv } from "@vercel/kv";
import { convertGMTStringToDate } from "@/lib/utils";
const AUDIO_OF_THE_DAY_KEY = 'audioOfTheDay'

export default async function Home() {
  let audioOfTheDay = null
  const storedAudio = await kv.get(AUDIO_OF_THE_DAY_KEY) as Episode
  const storedAudioDate = convertGMTStringToDate(storedAudio.pubDate)
  const currentDate = convertGMTStringToDate(new Date().toDateString())
  if (storedAudioDate === currentDate) {
    audioOfTheDay = storedAudio
  } else {
    audioOfTheDay = await getLatestEpisode()
    await kv.set(AUDIO_OF_THE_DAY_KEY, JSON.stringify(audioOfTheDay))
  }
  return (
    <>
      <main className="px-10 py-8" style={{ height: 'calc(100vh - 220px)' }}>
        <AudioDescription title={audioOfTheDay.title} date={audioOfTheDay.pubDate} />
      </main>
      <footer className='absolute bottom-0'>
        <AudioPlayer url={audioOfTheDay.enclosure["@_url"]} customStyles={{ width: '100vw' }} />
      </footer>
    </>
  )
}



