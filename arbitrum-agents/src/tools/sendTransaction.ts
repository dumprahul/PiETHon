import { Address, parseEther, AccessList } from 'viem'
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ToolConfig } from './allTools.js';

interface SendTransactionArgs {
    to: Address;
    value?: string;
}

export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'send_transaction',
            description: 'Send a transaction with optional parameters',
            parameters: {
                type: 'object',
                properties: {
                    to: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The recipient address',
                    },
                    value: {
                        type: 'string',
                        description: 'The amount of ETH to send (in ETH, not Wei)',
                        optional: true,
                    },
                },
                required: ['to']
            }
        }
    },
    handler: async (args) => {
        const result = await sendTransaction(args);
        if (!result.success || !result.hash) throw new Error(result.message);
        return result.hash;
    }
};

async function sendTransaction({
    to,
    value,
}: SendTransactionArgs) {
    try {
        const walletClient = createViemWalletClient();

        const hash = await walletClient.sendTransaction({
            to,
            value: value ? parseEther(value) : undefined,
        })

        return {
            success: true,
            hash,
            message: `Transaction sent successfully. Hash: ${hash}`
        }
    } catch (error) {
        return {
            success: false,
            hash: null,
            message: `Failed to send transaction: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
    }
}