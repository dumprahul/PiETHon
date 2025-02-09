import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants";
import { tools } from '../tools/allTools.js';
import { assistantPrompt } from "../const/prompt.js";

const apiKey = process.env.LLAMA_API_KEY || "your-api-key-here"; 

export const client = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://llama8b.gaia.domains/v1" 
});


export async function createAssistant(client: OpenAI): Promise<Assistant> {
    return await client.beta.assistants.create({
        model: "llama",
        name: "Ajith",
        instructions: assistantPrompt,
        tools: Object.values(tools).map(tool => tool.definition)
    });
}





//gaia-NmQyMDZjYjktNTJhNC00NjM5LTliMmUtMTgyZjI3NzM5ODZj-nnBOS6Fzf3Y7yp5f