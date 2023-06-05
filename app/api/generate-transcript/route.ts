// Importing necessary Firebase and XML parsing modules
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp, FirebaseApp } from "firebase/app";
import type { Episode } from "@/lib/rss/entities";
import { FIREBASE_CONFIG } from "@/lib/db/entities";
import getLatestEpisode from "@/lib/rss/getLatestEpisode";

const ASSEMBLYAI_LANGUAGE_CODE = "es";
const ASSEMBLYAI_WEBHOOK_URL = "https://aliento-para-el-viaje.vercel.app/api/save-transcript";

// Exporting a function to handle GET requests
export async function GET(request: Request) {
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
      return new Response("Successfully generated transcription", {
        status: 200,
      });
    } else {
      console.log("No new episode to be transcribed")
      return new Response("No new episode to be transcribed", {
        status: 500,
      });
    }
  } catch (error) {
    // Returning an error response if an error occurred during transcription generation or Firebase saving
    console.error(error);
    return new Response("An error ocurred while generating transcription", {
      status: 500,
    });
  }
}

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

