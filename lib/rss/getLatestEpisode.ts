import { XMLParser } from "fast-xml-parser";
import type { Episode } from "@/lib/rss/entities";

const OPTIONS = {
  ignoreAttributes: false,
  parseAttributeValue: true,
  allowBooleanAttributes: true,
};

const ANCHOR_RSS_URL = "https://anchor.fm/s/b039e4a4/podcast/rss";

const parser = new XMLParser(OPTIONS);

const getLatestEpisode = async (): Promise<Episode> => {
  const parser: XMLParser = new XMLParser(OPTIONS);
  const response: Response = await fetch(ANCHOR_RSS_URL, {
    method: "GET",
    cache: "no-cache",
  });
  const xml: string = await response.text();
  const jsonObj: any = parser.parse(xml);
  const lastEpisode: Episode = jsonObj.rss.channel.item[0] as Episode;
  return lastEpisode;
};

export default getLatestEpisode;