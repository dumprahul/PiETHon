import { Address } from 'viem';
import { createViemPublicClient } from '../viem/createViemPublicClient.js';
import { ToolConfig } from './allTools.js';

interface AuditCarbonCreditsArgs {
    user: Address;  // The address of the user whose carbon credit history is being audited
    abi: any[];  // ABI of the Carbon Credit contract
}

export const auditCarbonCreditsTool: ToolConfig<AuditCarbonCreditsArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'audit_carboncredits',
            description: 'Audit a users carbon credit history (purchased, transferred, retired)',
            parameters: {
                type: 'object',
                properties: {
                    user: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The address of the user whose carbon credit history is being audited',
                    },
                    abi: {
                        type: 'array',
                        description: 'The ABI of the contract',
                        items: {
                            type: 'object'
                        }
                    }
                },
                required: ['user', 'abi']
            }
        }
    },
    handler: async ({ user, abi }) => {
        return await auditCarbonCredits(user, abi);
    }
};

export async function auditCarbonCredits(
    user: Address,
    abi: any[]
) {
    const contractAddress = '0xb7aaB9a1b3Dc5FD418f430C3969fDcd8C1128711';  // Hardcoded contract address
    const publicClient = createViemPublicClient();

    // Call the contract function using the public client
    const result = await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: 'auditCarbonCredits',
        args: [user]
    });

    // Check if the result is an array, and map it to the expected structure
    if (Array.isArray(result)) {
        const auditResult = {
            purchased: result[0].toString(),
            transferred: result[1].toString(),
            retired: result[2].toString()
        };

        return auditResult;
    }

    throw new Error("Invalid result format");
}
