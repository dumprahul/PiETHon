import { Hash } from 'viem';
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ToolConfig } from './allTools.js';

const CONTRACT_ADDRESS = '0x6264292009B6F9D886111BB3678c14522A70bEf4'; // Hardcoded contract address

interface ClaimContractArgs {
    // The address parameter is no longer needed since it's hardcoded.
}

export const claimInsuranceTool: ToolConfig<ClaimContractArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'claim_insurance',
            description: 'Claim a fixed amount of ETH from the contract',
            parameters: {
                type: 'object',
                properties: {},
                required: [],
            },
        },
    },
    handler: async () => {
        return await claimContract();
    },
};

export async function claimContract(): Promise<Hash> {
    const walletClient = createViemWalletClient();
    const claimAbi = [
        {
            "type": "function",
            "name": "claim",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
        }
    ];

    // Execute the claim function on the contract using the hardcoded contract address
    const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: claimAbi,
        functionName: 'claim',
    });

    return hash;
}
