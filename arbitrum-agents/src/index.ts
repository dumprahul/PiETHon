import OpenAI from "openai";
import { Assistant } from 'openai/resources/beta/assistants';
import 'dotenv/config';
import { createAssistant } from './openai/createAssistant.js';
import { createThread } from './openai/createThread.js';
import { createRun } from './openai/createRun.js';
import { performRun } from './openai/performRun.js';


async function main(){
    const client = new OpenAI();
    const message= "Hey can you get my wallet balance? My wallet address is - 0x5E2be9Eaaf551f1862585A7D1FFaE2B3D7fE212D"   

    const assistant = await createAssistant(client);
    const thread = await createThread(client,message);

    const run = await createRun(client, thread, assistant.id);
    const result = await performRun(run, client, thread);

    console.log("the result is",result);
    
}

main();
