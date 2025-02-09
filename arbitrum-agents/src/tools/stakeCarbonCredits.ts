import { Hash } from 'viem';
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ToolConfig } from './allTools.js';

const CONTRACT_ADDRESS = '0xb7aaB9a1b3Dc5FD418f430C3969fDcd8C1128711'; // Hardcoded contract address

interface StakeCarbonCreditsArgs {
    user: string;   // The user address who is staking the carbon credits
    amount: number; // The amount of carbon credits to stake
}

export const stakeCarbonCreditsTool: ToolConfig<StakeCarbonCreditsArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'stake_carboncredits',
            description: 'Stake a certain amount of carbon credits for the user',
            parameters: {
                type: 'object',
                properties: {
                    user: {
                        type: 'string',
                        description: 'The address of the user staking the carbon credits',
                    },
                    amount: {
                        type: 'number',
                        description: 'The amount of carbon credits to stake',
                    },
                },
                required: ['user', 'amount'],
            },
        },
    },
    handler: async (args: StakeCarbonCreditsArgs) => {
        return await stakeCarbonCreditsContract(args.user, args.amount);
    },
};

export async function stakeCarbonCreditsContract(user: string, amount: number): Promise<Hash> {
    const walletClient = createViemWalletClient();
    const stakeCarbonCreditsAbi = [
        {
            "type": "function",
            "name": "stakeCarbonCredits",
            "inputs": [
                {
                    "type": "address",
                    "name": "user"
                },
                {
                    "type": "uint256",
                    "name": "amount"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        }
    ];

    // Execute the stakeCarbonCredits function on the contract using the hardcoded contract address
    const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: stakeCarbonCreditsAbi,
        functionName: 'stakeCarbonCredits',
        args: [user, amount],  // Pass the user address and amount to stake
    });

    return hash;
}
