const { XMLParser } = require("fast-xml-parser");

const options = {
  ignoreAttributes: false,
  parseAttributeValue: true,
  allowBooleanAttributes: true,
};

const parser = new XMLParser(options);

type Episode = {
  title: string;
  link: string;
  pubDate: string;
  enclosure: {
    "@_url": string;
    length: string;
    type: string;
  };
};

const getLatestEpisode = async () => {
  const response: Response = await fetch("https://anchor.fm/s/b039e4a4/podcast/rss", {
    method: "GET",
    cache: "no-cache",
  });
  const xml = await response.text();
  const jsonObj = parser.parse(xml);
  const lastEpisode = jsonObj.rss.channel.item[0] as Episode;
  return lastEpisode;
};

export default getLatestEpisode;