from collections.abc import Callable
from cdp import Wallet
from pydantic import BaseModel, Field
from cdp_agentkit_core.actions import CdpAction

# 1. Define the prompt that explains the tool
GET_NFT_METADATA_PROMPT = """
This tool fetches metadata for a specific NFT token from a contract.
It takes:
- contract_address: The NFT contract address
- token_id: The ID of the NFT token
"""

# 2. Define input validation schema
class GetNftMetadataInput(BaseModel):
    """Input argument schema for get NFT metadata action."""
    contract_address: str = Field(
        ..., 
        description="The NFT contract address to check"
    )
    token_id: str = Field(
        ...,
        description="The token ID to get metadata for"
    )

# 3. Implement the core function
def get_nft_metadata(
    wallet: Wallet,
    contract_address: str,
    token_id: str
) -> str:
    """Get metadata for a specific NFT token.

    Args:
        wallet (Wallet): The wallet instance
        contract_address (str): The NFT contract address
        token_id (str): The token ID to check

    Returns:
        str: The metadata information or error message
    """
    try:
        # Implement your logic here using wallet.invoke_contract() or other CDP SDK methods
        metadata = wallet.invoke_contract(
            contract_address=contract_address,
            method="tokenURI",
            args={"tokenId": token_id}
        )
        
        return f"NFT Metadata for token {token_id}: {metadata}"
    except Exception as e:
        return f"Error getting NFT metadata: {e!s}"

# 4. Define the Action class
class GetNftMetadataAction(CdpAction):
    """Get NFT metadata action."""
    name: str = "get_nft_metadata"
    description: str = GET_NFT_METADATA_PROMPT
    args_schema: type[BaseModel] | None = GetNftMetadataInput
    func: Callable[..., str] = get_nft_metadata 