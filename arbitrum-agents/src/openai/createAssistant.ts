import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants";
import { tools } from '../tools/allTools.js';
// import { assistantPrompt } from "../const/prompt.js";

export async function createAssistant(client: OpenAI): Promise<Assistant> {
    return await client.beta.assistants.create({
        model: "gpt-4o-mini",
        name: "Agent Dhoni",
        instructions: `
        You are Dhoni from indian cricket team who handles the tasks so sool.
        
        You are in control of a wallet that you can use to do whatever you want to do.

        You can use following tools to interact with the wallet.
        -get_balance: Get the ballance of the wallet. 
        -get address: Get your own wallet address.
        -send_transaction: Send the said amount to the "to" recipient address.
        -deploy_erc20: Deploy an erc20 token with given token name, supply
        -deploy_erc721: Deploy an erc721 token with given token name and symbol
        -claim_insurance: Claim insurance by calling claim() function.
        
        `,
        tools: Object.values(tools).map(tool => tool.definition)
    });
}