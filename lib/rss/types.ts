export type Episode = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  enclosure: {
    "@_url": string;
    length: string;
    type: string;
  };
  text: string;
};

export interface Channel {
  title: string;
  description: string;
  link: string;
  image: {
    url: string;
    title: string;
    link: string;
  };
  generator: string;
  lastBuildDate: string;
  'atom:link': {
    '@_href': string;
    '@_rel': string;
    '@_type': string;
  }[];
  author: string;
  copyright: string;
  language: string;
  'itunes:author': string;
  'itunes:summary': string;
  'itunes:type': string;
  'itunes:owner': {
    'itunes:name': string;
    'itunes:email': string;
  };
  'itunes:explicit': string;
  'itunes:category': {
    'itunes:category': {
      '@_text': string;
    };
    '@_text': string;
  };
  'itunes:image': {
    '@_href': string;
  };
  item: {
    title: string;
    description: string;
    pubDate: string;
    guid: string;
    link: string;
    enclosure: {
      '@_url': string;
      '@_length': string;
      '@_type': string;
    };
    'itunes:duration': string;
    'itunes:explicit': string;
    'itunes:episodeType': string;
    'itunes:season': string;
    'itunes:episode': string;
    'itunes:image': {
      '@_href': string;
    };
    'content:encoded': string;
  }[];
}

export interface RSSData {
  channel: Channel;
  '@_xmlns:dc': string;
  '@_xmlns:content': string;
  '@_xmlns:atom': string;
  '@_version': number;
  '@_xmlns:itunes': string;
  '@_xmlns:anchor': string;
}