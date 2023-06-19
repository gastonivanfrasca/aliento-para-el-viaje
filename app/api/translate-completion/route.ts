import { DBEndpoints, CompletionDBResp } from "@/lib/db/types";
import { getFromDB, writeToDB } from "@/lib/db/helpers";
import { createCompletion } from "@/lib/completions/helpers";
import { OPENAI_MODELS } from "@/lib/completions/types";

export async function POST(): Promise<Response> {
    try {
        const completion = await getFromDB(DBEndpoints.COMPLETION) as CompletionDBResp;
        const parsedCompletion = completion ? JSON.parse(completion.value) : null;
        const prompt = buildPrompt(parsedCompletion.markdown);
        const translatedCompletion = await createCompletion(OPENAI_MODELS.GPT4, prompt);
        await writeToDB(DBEndpoints.TRANSLATION, {
            value: translatedCompletion,
        });
        return new Response(translatedCompletion, { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}


const buildPrompt = (text: string): string => {
    const prompt = `
    1. Traduce el suiguiente texto markdown al inglés, no modifiques ni elimines los caracteres especiales que indican 
    un salto de línea (\n\n), negritas(***), además debes mantener todo un string de una línea ya que será enviado a través de HTTP:

    ${text}

    2. retorna el resultado dentro del siguiente JSON:

    {
        "markdown": (resultado del paso 1)
    }
`;
    return prompt;
}