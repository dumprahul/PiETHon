// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Deployed at 0xb7aaB9a1b3Dc5FD418f430C3969fDcd8C1128711

// Import the ERC-20 token interface
interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

// Smart contract for Carbon Credit Management
contract CarbonCredit {
    // The ERC-20 token (carbon credits) address
    IERC20 public carbonToken;

    // Mapping to store credit history for each user
    mapping(address => CreditHistory) public creditHistory;

    // Struct to hold a user's carbon credit history
    struct CreditHistory {
        uint256 purchased; // The total amount of carbon credits purchased/claimed by the user
        uint256 transferred; // The total amount of carbon credits transferred by the user
        uint256 retired; // The total amount of carbon credits retired (removed from circulation)
    }

    // Constructor to initialize the contract with the ERC-20 token address
    constructor(address _carbonToken) {
        carbonToken = IERC20(_carbonToken);
    }

    // Function to claim carbon tokens (fixed to 200 tokens)
    function claimCarbon() external {
        uint256 amount = 200; // Fixed amount of 200 carbon tokens

        // Ensure the contract has enough carbon tokens
        require(carbonToken.balanceOf(address(this)) >= amount, "Insufficient funds in the contract");

        // Transfer the fixed amount of 200 carbon tokens to the caller
        require(carbonToken.transfer(msg.sender, amount), "Transfer failed");

        // Update the credit history for the caller
        creditHistory[msg.sender].purchased += amount;
    }

    // Stake Carbon Credits function: Allows users to stake their carbon credits
    function stakeCarbonCredits(address user, uint256 amount) external {
        // Ensure the user has enough carbon credits to stake
        require(carbonToken.balanceOf(user) >= amount, "Insufficient balance to stake");

        // Transfer the carbon credits from the user to the contract (staking)
        require(carbonToken.transferFrom(user, address(this), amount), "Transfer failed");

        // Update the credit history for the user
        creditHistory[user].purchased -= amount;
    }

    // Carbon Credit Audit function: Allows users to audit their carbon credits history
    function auditCarbonCredits(address user) external view returns (CreditHistory memory) {
        return creditHistory[user]; // Return the full credit history for a given user
    }
}
