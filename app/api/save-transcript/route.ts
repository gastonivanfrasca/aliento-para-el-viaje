import { Status, DBEndpoints } from "@/lib/db/types";
import { writeToDB } from "@/lib/db/helpers";

interface TranscriptionResult {
  status: string;
  error?: string;
  text?: string;
}

const headers: { [key: string]: string } = {
  authorization: process.env.ASSEMBLYAI_KEY!,
  "content-type": "application/json",
};

export async function POST(request: Request): Promise<Response> {
  try {
    const req = await request.json()
    const status = req.status
    const transcriptID = req.transcript_id
    if (status === Status.COMPLETED) {
      const pollingEndpoint: string = `https://api.assemblyai.com/v2/transcript/${transcriptID}`;
      const pollingResponse: Response = await fetch(pollingEndpoint, { headers });
      const transcriptionResult: TranscriptionResult = await pollingResponse.json();
      writeToDB(DBEndpoints.TRANSCRIPTION, {
        createdAt: new Date().toISOString(),
        text: transcriptionResult.text,
      });
      return new Response(JSON.stringify("successfully saved transcription"), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    } else {
      const error = "Transcription not ready yet";
      console.error(error)
      throw new Error(error);
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify("An error occurred while saving the transcription"), {
      status: 500,
    });
  }
};