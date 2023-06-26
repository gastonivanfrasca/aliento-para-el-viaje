import type { Episode } from "@/lib/rss/types";
import { DBEndpoints } from "@/lib/db/types";
import { writeToDB } from "@/lib/db/helpers";
import { getLatestEpisode } from "@/lib/rss/helpers";

const ASSEMBLYAI_LANGUAGE_CODE = "es";
const ASSEMBLYAI_WEBHOOK_URL = "https://aliento-para-el-viaje.vercel.app/api/save-transcript";

export async function GET() {
  try {
    const latestEpisode: Episode = await getLatestEpisode();
    const pubDate: Date = new Date(latestEpisode.pubDate);
    const transcriptID = await generateTranscription(latestEpisode);
    const audioURL: string = latestEpisode.enclosure["@_url"];
    const episodeTitle = latestEpisode.title;

    await writeToDB(DBEndpoints.AUDIO, {
      transcriptionID: transcriptID,
      title: episodeTitle,
      createdAt: pubDate.toISOString(),
      url: audioURL,
    })
    return new Response("Successfully generated transcription", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("An error ocurred while generating transcription", {
      status: 500,
    });
  }
}

// Function to generate a transcription for an audio file using AssemblyAI
const generateTranscription = async (latestEpisode: Episode): Promise<string> => {
  const headers: Record<string, string> = {
    authorization: process.env.ASSEMBLYAI_KEY!,
    "content-type": "application/json",
  };

  const audioURL: string = latestEpisode.enclosure["@_url"];

  try {
    const response: Response = await fetch("https://api.assemblyai.com/v2/transcript", {
      method: "POST",
      body: JSON.stringify({
        audio_url: audioURL,
        language_code: ASSEMBLYAI_LANGUAGE_CODE,
        webhook_url: ASSEMBLYAI_WEBHOOK_URL,
        format_text: true,
      }),
      headers,
    });
    const responseData: any = await response.json();
    const transcriptId: string = responseData.id;
    return transcriptId;
  } catch (error) {
    console.error(error)
    throw new Error("An error ocurred while generating transcription");
  }
};

