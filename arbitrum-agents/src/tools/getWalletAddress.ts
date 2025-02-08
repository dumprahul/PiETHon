import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ToolConfig } from './allTools.js';

interface GetWalletAddressArgs {
    // No arguments needed as we're getting the bot's own address
}

export const getWalletAddressTool: ToolConfig<GetWalletAddressArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_wallet_address',
            description: 'Get the AI bot wallet address',
            parameters: {
                type: 'object',
                properties: {},
                required: []
            }
        }
    },
    handler: async () => {
        return await getWalletAddress();
    }
};

async function getWalletAddress() {
    const walletClient = createViemWalletClient();
    return walletClient.account.address;
}