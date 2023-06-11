import Footer from "@/components/Footer";
import { getDatabase, ref, child, get } from "firebase/database";
import { initializeApp, FirebaseApp } from "firebase/app";
import { DBEndpoints, FIREBASE_CONFIG } from "@/lib/db/entities";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type AudioMetadata = {
  createdAt: string;
  title: string;
  url: string;
}

export default async function Home() {
  let title: string = "-";
  let createdAt: string = "-";
  let url: string = "";
  let { text, error } = await getTextFromFirebase();

  if (error) {
    text = "No pudimos obtener el texto de este episodio. Intenta más tarde.";
  }

  let { audioMetadata, error: audioMetadataError } = await getAudioMetadata();

  if (audioMetadataError) {
    audioMetadata = null;
  } else {
    title = audioMetadata?.title || "-";
    url = audioMetadata?.url || "";
    if (audioMetadata?.createdAt) {
      const date  = new Date(audioMetadata.createdAt);
      createdAt = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 pb-44">
      <Footer audioURL={url} />
      <Card className="w-screen md:w-full border-none shadow-none">
        <CardHeader>
          <CardTitle>{`${title} - ${createdAt}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg text-gray-700">
            {text}
          </CardDescription>
        </CardContent>
      </Card>
    </main>
  );
}

export const revalidate = 60;


const getTextFromFirebase = async (): Promise<{
  text: string | null | undefined,
  error: any | null
}> => {
  const app: FirebaseApp = initializeApp(FIREBASE_CONFIG);
  const dbRef = ref(getDatabase(app));
  try {
    const { text, error } = await get(child(dbRef, DBEndpoints.TRANSCRIPTION)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        return { text: data.text, error: null };
      } else {
        console.log("no data available");
        return { text: null, error: "no data available" };
      }
    })
    return { text, error };
  } catch (error) {
    console.log(error);
    return { text: null, error };
  }
}

const getAudioMetadata = async (): Promise<{
  audioMetadata: AudioMetadata | null | undefined,
  error: any | null
}> => {
  const app: FirebaseApp = initializeApp(FIREBASE_CONFIG);
  const dbRef = ref(getDatabase(app));
  try {
    const { audioMetadata, error } = await get(child(dbRef, DBEndpoints.AUDIO)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        return {
          audioMetadata: {
            createdAt: data.createdAt,
            title: data.title,
            url: data.url,
          }, error: null
        };
      } else {
        const error = "no data available";
        console.log(error);
        throw new Error(error);
      }
    })
    return { audioMetadata, error };
  } catch (error) {
    console.log(error);
    throw error;
  }
}