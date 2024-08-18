import { getLatestEpisode } from "@/lib/rss"
import { Episode } from "@/lib/rss/types";
import { kv } from "@vercel/kv";
import { convertGMTStringToDate } from "@/lib/utils";
import Sharer from "@/components/common/Sharer";

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
  const url = audioOfTheDay.enclosure["@_url"]
  const title = audioOfTheDay.title
  const date = audioOfTheDay.pubDate

  return (
    <Sharer url={url} title={title} date={date} />
  )
}


