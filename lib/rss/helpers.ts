/**
 * Helper functions for RSS feed parsing.
 * @module helpers
 */

import { XMLParser } from "fast-xml-parser";
import type { Episode } from "@/lib/rss/types";

/**
 * Options for the XML parser.
 */
const OPTIONS = {
    ignoreAttributes: false,
    parseAttributeValue: true,
    allowBooleanAttributes: true,
};

/**
 * The URL of the RSS feed to fetch.
 */
const ANCHOR_RSS_URL = "https://anchor.fm/s/b039e4a4/podcast/rss";

/**
 * Fetches the latest episode from the RSS feed.
 * @returns {Promise<Episode>} A promise that resolves to the latest episode.
 */
export const getLatestEpisode = async (): Promise<Episode> => {
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