// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for interacting with the ERC-20 token contract
interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract CarbonClaim {
    // The address of the ERC-20 'carbon' token contract
    IERC20 public carbonToken;
    
    // Address to store the contract's balance of 'carbon' tokens
    address public owner;

    // Mapping to store the staked carbon credits for each user
    mapping(address => uint256) public stakedCredits;

    // Mapping to store the carbon credit history for each user
    struct CreditHistory {
        uint256 minted;
        uint256 purchased;
        uint256 transferred;
        uint256 retired;
    }
    mapping(address => CreditHistory) public creditHistory;

    // Set the token contract address and owner of the contract
    constructor(address _carbonToken) {
        carbonToken = IERC20(_carbonToken);
        owner = msg.sender;
    }

    // Modifier to allow only the owner to fund the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Fund the contract with ERC-20 'carbon' tokens
    function fundContract(uint256 amount) external onlyOwner {
        require(carbonToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
    }

    // Claim 'carbon' tokens from the contract by any caller
    function claimCarbon(uint256 amount) external {
        require(carbonToken.transfer(msg.sender, amount), "Transfer failed");

        // Update the credit history
        creditHistory[msg.sender].purchased += amount;
    }

    // Stake 'carbon' tokens to support environmental initiatives
    function stakeCarbonCredits(address user, uint256 amount) external {
        require(carbonToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        // Update the staked credits for the user
        stakedCredits[user] += amount;

        // Update the user's history (assuming they are staking their own credits)
        creditHistory[user].minted += amount;
    }

    // Withdraw staked 'carbon' credits
    function withdrawStakedCredits(uint256 amount) external {
        require(stakedCredits[msg.sender] >= amount, "Insufficient staked credits");
        
        // Update the staked credits for the user
        stakedCredits[msg.sender] -= amount;

        // Transfer the staked amount back to the user
        require(carbonToken.transfer(msg.sender, amount), "Transfer failed");
    }

    // Carbon Credit Audit: Provides an audit of a user's carbon credits history
    function auditCarbonCredits(address user) external view returns (uint256 minted, uint256 purchased, uint256 transferred, uint256 retired) {
        CreditHistory memory history = creditHistory[user];
        return (history.minted, history.purchased, history.transferred, history.retired);
    }

    // To receive Ether if needed for gas or other purposes (optional)
    receive() external payable {}
}
