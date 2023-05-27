import Footer from "@/components/Footer";

const AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Footer audioURL={AUDIO_URL}/>
    </main>
  );
}
