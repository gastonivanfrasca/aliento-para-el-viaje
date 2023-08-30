import AudioPlayer from "@/components/common/AudioPlayer"
import AudioDescription from "@/components/pages/Home/AudioDescription"
import { getLatestEpisode } from "@/lib/rss"

export default async function Home() {
  const audioOfTheDay = await getLatestEpisode()

  return (
    <>
      <main className="px-10 py-14" style={{ height: 'calc(100vh - 220px)' }}>
        <AudioDescription title={audioOfTheDay.title} date={audioOfTheDay.pubDate} />
      </main>
      <footer className='absolute bottom-0'>
        <AudioPlayer url={audioOfTheDay.enclosure["@_url"]} customStyles={{ width: '100vw' }} />
      </footer>
    </>
  )
}

