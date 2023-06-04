import { getDatabase, ref, set } from "firebase/database";
import { initializeApp, FirebaseApp } from "firebase/app";

interface TranscriptionResult {
  status: string;
  error?: string;
  text?: string;
}

const firebaseConfig = {
  apiKey: process.env.FIREKEY,
  authDomain: "aliento-para-el-viaje-7d878.firebaseapp.com",
  projectId: "aliento-para-el-viaje-7d878",
  storageBucket: "aliento-para-el-viaje-7d878.appspot.com",
  messagingSenderId: "1022413690846",
  appId: "1:1022413690846:web:44ef84a3b45b8f7311ef4f",
  measurementId: "G-D18XLPD4CX",
  databaseURL:
    "https://aliento-para-el-viaje-7d878-default-rtdb.firebaseio.com/",
};

// Define headers for the AssemblyAI API request
const headers: { [key: string]: string } = {
  authorization: process.env.ASSEMBLYAI_KEY!,
  "content-type": "application/json",
};

export async function POST(request: Request): Promise<Response> {
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const req = await request.json()
  const status = req.status
  const transcriptID = req.transcript_id
  if (status === "completed") {
    // Define the polling endpoint for the AssemblyAI API
    const pollingEndpoint: string = `https://api.assemblyai.com/v2/transcript/${transcriptID}`;
    const pollingResponse: Response = await fetch(pollingEndpoint, { headers });
    // Parse the transcription result from the response
    const transcriptionResult: TranscriptionResult = await pollingResponse.json();
    console.log(transcriptionResult)
    // Save the transcription to Firebase
    set(ref(db, "transcription"), {
      createdAt: new Date().toISOString(),
      text: transcriptionResult.text,
    }).then(() => {
      console.log("successfully saved transcription");
    }).catch((error: Error) => {
      console.log(error)
    });
    return new Response(JSON.stringify("successfully saved transcription"), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } else {
    // If the status is not "completed", return a message indicating that the transcription is not yet complete
    return new Response(JSON.stringify("transcription not completed yet"), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
};
