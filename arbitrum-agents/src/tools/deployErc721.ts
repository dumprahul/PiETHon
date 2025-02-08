import { ToolConfig } from './allTools.js';
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ERC721_ABI, ERC721_BYTECODE } from '../const/contractDetails_erc721.js'; // Replace with your ABI and bytecode
import { createViemPublicClient } from '../viem/createViemPublicClient.js';

export const deployErc721Tool: ToolConfig = {
    definition: {
        type: 'function',
        function: {
            name: 'deploy_erc721',
            description: 'Deploy a new ERC721 token contract',
            parameters: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'The name of the token'
                    },
                    symbol: {
                        type: 'string',
                        description: 'The symbol of the token'
                    }
                },
                required: ['name', 'symbol']
            }
        }
    },
    handler: async (args: { name: string, symbol: string }) => {
        const publicClient = createViemPublicClient();
        const walletClient = createViemWalletClient();

        const hash = await walletClient.deployContract({
            account: walletClient.account,
            abi: ERC721_ABI,
            bytecode: ERC721_BYTECODE,
            args: [args.name, args.symbol]
        });

        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        

        console.log(`Contract deployed at address: ${receipt.contractAddress}`);

        return `${args.name} (${args.symbol}) token deployed successfully at: ${receipt.contractAddress}`;
    }
};