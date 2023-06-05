import Footer from "@/components/Footer";
import getLatestEpisode from "@/lib/rss/getLatestEpisode";
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

export default async function Home() {
  const latestEpisode = await getLatestEpisode();
  const audioURL = latestEpisode.enclosure["@_url"];
  let { text, error } = await getTextFromFirebase();
  if (error) {
    console.error(error);
    text = "No pudimos obtener el texto de este episodio. Intenta más tarde.";
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pb-44">
      <Footer audioURL={audioURL} />
      <Card className="w-screen md:w-80">
        <CardHeader>
          <CardTitle>Episode 1</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg">
            {text}
          </CardDescription>
        </CardContent>
      </Card>
    </main>
  );
}


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
        return { text: null, error: "no data available" };
      }
    })
    return { text, error };
  } catch (error) {
    return { text: null, error };
  }
}