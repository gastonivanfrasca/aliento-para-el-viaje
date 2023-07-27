import { getRSSData } from "@/lib/rss/helpers"
import EpisodesList from "@/components/EpisodesList"

export default async function AudioList () {
    const rssData = await getRSSData()
    const audios = rssData.channel.item.map(item => {
        return {
            title: item.title,
            url: item.enclosure["@_url"],
            createdAt: item.pubDate
        }
    })
    return <EpisodesList audioList={audios} />
}

