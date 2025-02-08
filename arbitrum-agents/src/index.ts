import OpenAI from "openai";
import { Assistant } from 'openai/resources/beta/assistants';
import 'dotenv/config';
import { createAssistant } from './openai/createAssistant.js';
import { createThread } from './openai/createThread.js';
import { createRun } from './openai/createRun.js';
import { performRun } from './openai/performRun.js';


async function main(){
    const client = new OpenAI();
    const message= "Hey Dhoni deploy an erc721 NFT. The token name is Priya and the token symbol is shan "   

    const assistant = await createAssistant(client);
    const thread = await createThread(client,message);

    const run = await createRun(client, thread, assistant.id);
    const result = await performRun(run, client, thread);

    console.log("the result is",result);
    
}

main();
