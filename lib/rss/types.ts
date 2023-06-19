export type Episode = {
    title: string;
    link: string;
    pubDate: string;
    enclosure: {
        "@_url": string;
        length: string;
        type: string;
    };
};