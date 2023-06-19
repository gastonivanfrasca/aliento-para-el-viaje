import { DBEndpoints } from "@/lib/db/types";
import Transcription from "@/components/Transcription";
import { getFromDB } from "@/lib/db/helpers";

type AudioMetadata = {
  createdAt: string;
  title: string;
  url: string;
};

type Completion = {
  value: string;
};

export default async function Home() {
  let title: string = "-";
  let createdAt: string = "-";
  let url: string = "";

  try {
    const audioMetadata = await getFromDB(DBEndpoints.AUDIO) as AudioMetadata;
    const completion = await getFromDB(DBEndpoints.COMPLETION) as Completion;
    const translation = await getFromDB(DBEndpoints.TRANSLATION) as Completion;
    const markdowns = parseMarkdowns(completion, translation);
    title = audioMetadata?.title || "-";
    url = audioMetadata?.url || "";
    if (audioMetadata?.createdAt) {
      const date = new Date(audioMetadata.createdAt);
      createdAt = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
    return <Transcription title={title} createdAt={createdAt} url={url} markdowns={markdowns} />
  } catch (error) {
    // TODO: redirect to error page
    console.error(error);
    return <></>
  }
}

export const revalidate = 0;

const parseMarkdowns = (completion: Completion, translation: Completion) => {
  const parsedCompletion = completion ? JSON.parse(completion.value) : null;
  const completionMarkdown = parsedCompletion?.markdown || "";
  const parsedTranslation = translation ? JSON.parse(translation.value) : null;
  const translationMarkdown = parsedTranslation?.markdown || "";
  const markdowns = {
    completion: completionMarkdown,
    translation: translationMarkdown,
  }
  return markdowns;
}