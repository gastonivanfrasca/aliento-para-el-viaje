// Importing necessary Firebase and XML parsing modules
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp, FirebaseApp } from "firebase/app";
import { XMLParser } from "fast-xml-parser";

// Defining types for the podcast episode and Firebase configuration
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

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
  databaseURL: string;
};

// Options for XML parsing
const OPTIONS: Record<string, any> = {
  ignoreAttributes: false,
  parseAttributeValue: true,
  allowBooleanAttributes: true,
};

// Firebase configuration and URLs for the podcast RSS feed and AssemblyAI webhook
const FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: process.env.FIREKEY!,
  authDomain: "aliento-para-el-viaje-7d878.firebaseapp.com",
  projectId: "aliento-para-el-viaje-7d878",
  storageBucket: "aliento-para-el-viaje-7d878.appspot.com",
  messagingSenderId: "1022413690846",
  appId: "1:1022413690846:web:44ef84a3b45b8f7311ef4f",
  measurementId: "G-D18XLPD4CX",
  databaseURL:
    "https://aliento-para-el-viaje-7d878-default-rtdb.firebaseio.com/",
};

const ANCHOR_RSS_URL = "https://anchor.fm/s/b039e4a4/podcast/rss";
const ASSEMBLYAI_LANGUAGE_CODE = "es";
const ASSEMBLYAI_WEBHOOK_URL = "https://aliento-para-el-viaje.vercel.app/api/save-transcript";

// Exporting a function to handle GET requests
export async function GET(request: Request): Promise<Response> {
  try {
    // Retrieving the latest episode from the podcast RSS feed
    const latestEpisode: Episode = await getLatestEpisode();
    // Initializing the Firebase app and database
    const app: FirebaseApp = initializeApp(FIREBASE_CONFIG);
    const db = getDatabase(app);
    // Extracting the audio URL and publication date from the latest episode
    const audioURL: string = latestEpisode.enclosure["@_url"];
    const pubDate: Date = new Date(latestEpisode.pubDate);
    const currentDate: Date = new Date();
    const episodePubDate = pubDate.getDate()
    const currentDay = currentDate.getDate()
    // Checking if the latest episode was published today
    console.log(episodePubDate, currentDay)
    if (episodePubDate === currentDay) {
      // Generating a transcription for the latest episode using AssemblyAI
      const transcriptID: string = await generateTranscription(audioURL);
      // Saving the transcription ID, creation date, and audio URL to Firebase
      await saveTranscriptToFirebase(db, transcriptID, pubDate.toISOString(), audioURL);
      // Returning a success response
      return new Response(JSON.stringify("successfully generated transcription"), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    } else {
      // Returning an error response if the latest episode was not published today
      return new Response(JSON.stringify({ message: "no new audio yet" }), {
        status: 204,
        headers: {
          "content-type": "application/json",
        },
      });
    }
  } catch (error) {
    // Returning an error response if an error occurred during transcription generation or Firebase saving
    console.error(error);
    return new Response(JSON.stringify("error while generating transcription"), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}

// Function to retrieve the latest episode from the podcast RSS feed
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

// Function to generate a transcription for an audio file using AssemblyAI
const generateTranscription = async (audioURL: string): Promise<string> => {
  const headers: Record<string, string> = {
    authorization: process.env.ASSEMBLYAI_KEY!,
    "content-type": "application/json",
  };
  const response: Response = await fetch("https://api.assemblyai.com/v2/transcript", {
    method: "POST",
    body: JSON.stringify({
      audio_url: audioURL,
      language_code: ASSEMBLYAI_LANGUAGE_CODE,
      webhook_url: ASSEMBLYAI_WEBHOOK_URL,
    }),
    headers,
  });
  const responseData: any = await response.json();
  const transcriptId: string = responseData.id;
  return transcriptId;
};

// Function to save a transcription ID, creation date, and audio URL to Firebase
const saveTranscriptToFirebase = async (db: any, transcriptID: string, createdAt: string, audioURL: string) => {
  await set(ref(db, "audio"), {
    transcriptionID: transcriptID,
    createdAt: createdAt,
    url: audioURL,
  });
};

