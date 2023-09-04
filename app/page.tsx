import AudioPlayer from "@/components/common/AudioPlayer"
import AudioDescription from "@/components/pages/Home/AudioDescription"
import { getLatestEpisode } from "@/lib/rss"
import { Episode } from "@/lib/rss/types";
import { kv } from "@vercel/kv";
import va from '@vercel/analytics';
import { convertGMTStringToDate } from "@/lib/utils";
import { Subscriptions } from "@/types/subscription";

const webpush = require('web-push');

const AUDIO_OF_THE_DAY_KEY = 'audioOfTheDay'

const vapidKeys = {
  publicKey: process.env.VAP_PUB,
  privateKey: process.env.VAP
};

webpush.setVapidDetails(
  'mailto:alientoparaelviajeaudios@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

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
    if (convertGMTStringToDate(audioOfTheDay.pubDate) === currentDate) {
      va.track('Stored rss audio and sended notification')
      await kv.set(AUDIO_OF_THE_DAY_KEY, JSON.stringify(audioOfTheDay))
      const subscriptions = await kv.get('subscriptions') as Subscriptions
      subscriptions.forEach((sub) => {
        webpush.sendNotification(sub, 'Ya está disponible el audio del día');
      });
    }
    return audioOfTheDay
  }
}

export default async function Home() {
  const audioOfTheDay = await getAudioOfTheDay()

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
