import { OPENAI_MODELS } from "./types";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const COMPLETION_ROLE = "user";

/**
 * Creates a chat completion using the OpenAI API.
 * @param model The OpenAI model to use for the completion.
 * @param prompt The prompt to use for the completion.
 * @returns The generated completion.
 * @throws An error if an error occurs while generating the completion.
 */
export const createCompletion = async (model: OPENAI_MODELS, prompt: string) => {
    const openai = new OpenAIApi(configuration);
    try {
        const response = await openai.createChatCompletion({
            model: model,
            temperature: 0,
            messages: [{ role: COMPLETION_ROLE, content: prompt }],
        });
        return response.data.choices[0].message["content"];
    } catch (error) {
        console.error(error);
        throw new Error("An error ocurred while generating completion");
    }
};