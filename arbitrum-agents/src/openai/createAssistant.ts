import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants";
import { tools } from '../tools/allTools.js';
import { assistantPrompt } from "../const/prompt.js";

//Use for GaiaNode:

const apiKey = process.env.LLAMA_API_KEY || "your-api-key-here"; 

export const client = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://llama70b.gaia.domains/v1" 
});


export async function createAssistant(client: OpenAI): Promise<Assistant> {
    return await client.beta.assistants.create({
        model: "llama",
        name: "Ajith",
        instructions: assistantPrompt,
        tools: Object.values(tools).map(tool => tool.definition)
    });
}


//Use for Open-ai :

// export async function createAssistant(client: OpenAI): Promise<Assistant> {
//     return await client.beta.assistants.create({
//         model: "gpt-4o-mini",
//         name: "Alt",
//         instructions: assistantPrompt,
//         tools: Object.values(tools).map(tool => tool.definition)
//     });
// }