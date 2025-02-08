import { ToolConfig } from './allTools.js';
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ERC721_ABI, ERC721_BYTECODE } from '../const/contractDetails_erc721.js';
import { createViemPublicClient } from '../viem/createViemPublicClient.js';

export const deployErc721Tool: ToolConfig = {
    definition: {
        type: 'function',
        function: {
            name: 'deploy_erc721',
            description: 'Deploy a new ERC721 NFT contract',
            parameters: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'The name of the NFT collection'
                    },
                    symbol: {
                        type: 'string',
                        description: 'The symbol of the NFT collection'
                    },
                    owner: {
                        type: 'string',
                        description: 'The initial owner of the contract'
                    }
                },
                required: ['name', 'symbol', 'owner']
            }
        }
    },
    handler: async (args: { name: string, symbol: string, owner: string }) => {
        const publicClient = createViemPublicClient();
        const walletClient = createViemWalletClient();

        const hash = await walletClient.deployContract({
            account: walletClient.account,
            abi: ERC721_ABI,
            bytecode: ERC721_BYTECODE,
            args: [args.name, args.symbol, args.owner]
        });

        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        console.log(`NFT Contract deployed at address: ${receipt.contractAddress}`);

        return `${args.name} (${args.symbol}) NFT contract deployed successfully at: ${receipt.contractAddress}`;
    }
};
