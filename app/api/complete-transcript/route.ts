import { DBEndpoints } from "@/lib/db/types";
import { getFromDB, writeToDB } from "@/lib/db/helpers";
import { createCompletion } from "@/lib/completions/helpers";
import { OPENAI_MODELS } from "@/lib/completions/types";

type TranscriptionResp = {
    text: string;
    createdAt: string;
};

export async function POST(): Promise<Response> {
    try {
        const { text } = await getFromDB(DBEndpoints.TRANSCRIPTION) as TranscriptionResp;
        const prompt = buildPrompt(text);
        const completion = await createCompletion(OPENAI_MODELS.GPT4, prompt);
        await writeToDB(DBEndpoints.COMPLETION, {
            value: completion,
        });
        return new Response(completion, { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}


const buildPrompt = (text: string): string => {
    const prompt = `
    1. Dale formato al siguiente texto para que sea utilizado en un componente de React que utilice la librería "react-markdown", el resultado debe ser un sólo string con caracteres que indiquen que se debe insertar un salto de línea (\n\n), negritas(***), etc, además al ser una trasncripción de audio es posible que nombres o palabras no estén bien escritas, corrígelas:

    ${text}

    2. retorna el resultado dentro del siguiente JSON:

    {
        "markdown": (resultado del paso 1)
    }
`;
    return prompt;
}
