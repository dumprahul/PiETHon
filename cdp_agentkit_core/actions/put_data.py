from pydantic import BaseModel, Field
from cdp_agentkit_core.actions.cdp_action import CdpAction
from web3 import Web3
import os

class PutDataInput(BaseModel):
    data: str = Field(
        ...,
        description="The data to store on-chain"
    )

class PutDataAction(CdpAction):
    name = "putdata"
    description = """
    Stores data on the Base testnet blockchain using a smart contract.
    Input should be the data you want to store on-chain.
    Returns the transaction hash of the storage operation.
    """
    args_schema = PutDataInput

    def __init__(self):
        super().__init__()
        # Initialize Web3 with Base Goerli testnet
        self.w3 = Web3(Web3.HTTPProvider('https://goerli.base.org'))
        
        # Contract details
        self.contract_address = "0x2D7d83C0A350561f6b0faF5e228990c6820915A6"
        self.contract_abi = [
            {
                "anonymous": False,
                "inputs": [
                    {
                        "indexed": True,
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "indexed": False,
                        "internalType": "string",
                        "name": "data",
                        "type": "string"
                    }
                ],
                "name": "DataStored",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_data",
                        "type": "string"
                    }
                ],
                "name": "putData",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
        
        # Initialize contract
        self.contract = self.w3.eth.contract(
            address=self.contract_address,
            abi=self.contract_abi
        )

    def execute(self, **kwargs) -> str:
        inputs = PutDataInput(**kwargs)
        
        try:
            # Get account from private key
            private_key = os.getenv('PRIVATE_KEY')
            if not private_key:
                return "Error: PRIVATE_KEY environment variable not set"
            
            account = self.w3.eth.account.from_key(private_key)
            
            # Build transaction
            nonce = self.w3.eth.get_transaction_count(account.address)
            
            # Create the transaction
            transaction = self.contract.functions.putData(inputs.data).build_transaction({
                'from': account.address,
                'nonce': nonce,
                'gas': 100000,  # Adjust gas as needed
                'gasPrice': self.w3.eth.gas_price
            })
            
            # Sign and send transaction
            signed_tx = self.w3.eth.account.sign_transaction(transaction, private_key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
            
            # Wait for transaction receipt
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            # Create Basescan link
            basescan_link = f"https://goerli.basescan.org/tx/{receipt.transactionHash.hex()}"
            
            return f"Data successfully stored on-chain! Transaction hash: {receipt.transactionHash.hex()}\nView on Basescan: {basescan_link}"
            
        except Exception as e:
            return f"Error storing data on-chain: {str(e)}" 