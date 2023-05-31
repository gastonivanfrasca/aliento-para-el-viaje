import Footer from "@/components/Footer";

const { XMLParser } = require("fast-xml-parser");

const options = {
  ignoreAttributes: false,
  parseAttributeValue: true,
  allowBooleanAttributes: true,
};

const parser = new XMLParser(options);

type Episode = {
  title: string;
  link: string;
  pubDate: string;
  enclosure: {
    "@_url": string;
    length: string;
    type: string;
  };
};

export default async function Home() {
  const latestEpisode = await getLatestEpisode();
  const audioURL = latestEpisode.enclosure["@_url"];
  const transcript = await transcribeAudio(audioURL);
  console.log(transcript);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Footer audioURL={audioURL} />
    </main>
  );
}

const getLatestEpisode = async () => {
  const response = await fetch("https://anchor.fm/s/b039e4a4/podcast/rss");
  const xml = await response.text();
  const jsonObj = parser.parse(xml);
  const lastEpisode = jsonObj.rss.channel.item[0] as Episode;
  return lastEpisode;
};

async function transcribeAudio(audio_url: string) {
  console.log("Transcribing audio... This might take a moment.");

  // Set the headers for the request, including the API token and content type
  const headers = {
    authorization: process.env.ASSEMBLYAI_KEY,
    "content-type": "application/json",
  };

  // Send a POST request to the transcription API with the audio URL in the request body
  const response = await fetch("https://api.assemblyai.com/v2/transcript", {
    method: "POST",
    body: JSON.stringify({ audio_url, language_code: "es" }),
    headers,
  });

  // Retrieve the ID of the transcript from the response data
  const responseData = await response.json();
  const transcriptId = responseData.id;

  // Construct the polling endpoint URL using the transcript ID
  const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

  // Poll the transcription API until the transcript is ready
  while (true) {
    // Send a GET request to the polling endpoint to retrieve the status of the transcript
    const pollingResponse = await fetch(pollingEndpoint, { headers });
    const transcriptionResult = await pollingResponse.json();

    // If the transcription is complete, return the transcript object
    if (transcriptionResult.status === "completed") {
      return transcriptionResult;
    }
    // If the transcription has failed, throw an error with the error message
    else if (transcriptionResult.status === "error") {
      throw new Error(`Transcription failed: ${transcriptionResult.error}`);
    }
    // If the transcription is still in progress, wait for a few seconds before polling again
    else {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}
