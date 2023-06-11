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
    const pubDate: Date = new Date(latestEpisode.pubDate);
    const currentDate: Date = new Date();
    const formattedPubDate = `${pubDate.getFullYear()}-${pubDate.getMonth()}-${pubDate.getDate()}`
    const formattedCurrentDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`
    // Checking if the latest episode was published today
    console.log(formattedPubDate, formattedCurrentDate)
    if (true) {
      // Generating a transcription for the latest episode using AssemblyAI
      const { id: transcriptID, error } = await generateTranscription(latestEpisode);
      if (error) {
        throw new Error("An error ocurred while generating transcription");
      }
      // Saving the transcription ID, creation date, and audio URL to Firebase
      await saveTranscriptToFirebase(db, transcriptID, latestEpisode, pubDate.toISOString());
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
const generateTranscription = async (latestEpisode: Episode): Promise<{
  id: string;
  error: Error | null;
}> => {
  const headers: Record<string, string> = {
    authorization: process.env.ASSEMBLYAI_KEY!,
    "content-type": "application/json",
  };
  const audioURL: string = latestEpisode.enclosure["@_url"];
  const episodeTitle = latestEpisode.title;
  console.log(episodeTitle)
  try {
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
    return {
      id: transcriptId,
      error: null,
    }
  } catch (error) {
    console.log(error)
    throw new Error("An error ocurred while generating transcription");
  }
};

// Function to save a transcription ID, creation date, and audio URL to Firebase
const saveTranscriptToFirebase = async (db: any, transcriptID: string, latestEpisode: Episode, pubDate: string) => {
  const audioURL: string = latestEpisode.enclosure["@_url"];
  const episodeTitle = latestEpisode.title;
  try {
    await set(ref(db, "audio"), {
      transcriptionID: transcriptID,
      title: episodeTitle,
      createdAt: pubDate,
      url: audioURL,
    });
  } catch (error) {
    console.log(error)
    throw new Error("An error ocurred while saving transcription to Firebase");
  }
};

