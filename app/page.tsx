import Footer from "@/components/Footer";
import getLatestEpisode from "@/lib/audio/getLatestEpisode";

export default async function Home() {
  const latestEpisode = await getLatestEpisode();
  const audioURL = latestEpisode.enclosure["@_url"];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Footer audioURL={audioURL} />
    </main>
  );
}

