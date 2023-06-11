import { getDatabase, ref, set } from "firebase/database";
import { initializeApp, FirebaseApp } from "firebase/app";
import { FIREBASE_CONFIG, Status, DBEndpoints } from "@/lib/db/entities";

interface TranscriptionResult {
  status: string;
  error?: string;
  text?: string;
}

// Define headers for the AssemblyAI API request
const headers: { [key: string]: string } = {
  authorization: process.env.ASSEMBLYAI_KEY!,
  "content-type": "application/json",
};

export async function POST(request: Request): Promise<Response> {
  const app: FirebaseApp = initializeApp(FIREBASE_CONFIG);
  const db = getDatabase(app);
  try {
    const req = await request.json()
    const status = req.status
    const transcriptID = req.transcript_id
    if (status === Status.COMPLETED) {
      // Define the polling endpoint for the AssemblyAI API
      const pollingEndpoint: string = `https://api.assemblyai.com/v2/transcript/${transcriptID}`;
      const pollingResponse: Response = await fetch(pollingEndpoint, { headers });
      // Parse the transcription result from the response
      const transcriptionResult: TranscriptionResult = await pollingResponse.json();
      console.log(transcriptionResult.text)
      // Save the transcription to Firebase
      await set(ref(db, DBEndpoints.TRANSCRIPTION), {
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
      throw new Error("Transcription not ready yet");
    }
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify("An error occurred while saving the transcription"), {
      status: 500,
    });
  }
};