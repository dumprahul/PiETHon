import { deployErc20Tool } from './deployErc20.js';
import { deployErc721Tool } from './deployErc721.js';
import { getBalanceTool } from './getBalance.js';
import { getWalletAddressTool } from './getWalletAddress.js';
import { sendTransactionTool } from './sendTransaction.js';
import { getTransactionReceiptTool } from './getTransactionReceipt.js';
import { claimInsuranceTool } from './claiminsurance.js';
import { claimCarbonTool } from './claimCarbonCredits.js';
import { stakeCarbonCreditsTool } from './stakeCarbonCredits.js';
import { auditCarbonCreditsTool } from './auditCarbonCredits.js';



export interface ToolConfig<T = any> {
    definition: {
        type: 'function';
        function: {
            name: string;
            description: string;
            parameters: {
                type: 'object';
                properties: Record<string, unknown>;
                required: string[];
            };
        };
    };
    handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
    get_balance: getBalanceTool,
    get_wallet_address: getWalletAddressTool,
    send_transaction:sendTransactionTool,
    deploy_erc20:deployErc20Tool,
    deploy_erc721:deployErc721Tool,
    get_transaction_receipt: getTransactionReceiptTool,
    claim_insurance:claimInsuranceTool,
    claim_carboncredits:claimCarbonTool,
    stake_carboncredits:stakeCarbonCreditsTool,
    audit_carboncredits:auditCarbonCreditsTool
};