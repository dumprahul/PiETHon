import { Hash } from 'viem';
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ToolConfig } from './allTools.js';

const CONTRACT_ADDRESS = '0xb7aaB9a1b3Dc5FD418f430C3969fDcd8C1128711'; // Hardcoded contract address

interface ClaimCarbonArgs {
    // The address parameter is no longer needed since it's hardcoded
}

export const claimCarbonTool: ToolConfig<ClaimCarbonArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'claim_carboncredits',
            description: 'Claim a fixed amount of carbon credits from the contract',
            parameters: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
    },
    handler: async () => {
        return await claimCarbonContract();
    },
};

export async function claimCarbonContract(): Promise<Hash> {
    const walletClient = createViemWalletClient();
    const claimCarbonAbi = [
        {
            "type": "function",
            "name": "claimCarbon",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
        }
    ];

    // Execute the claimCarbon function on the contract using the hardcoded contract address
    const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: claimCarbonAbi,
        functionName: 'claimCarbon',
    });

    return hash;
}
