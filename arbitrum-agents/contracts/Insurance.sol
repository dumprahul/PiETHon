// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsuranceClaim {
    
    address public insurer;
    address public vehicleOwner;
    uint256 public claimAmount;
    uint256 public incidentTime;
    bool public claimApproved;
    bool public claimProcessed;
    
    enum ClaimStatus { Pending, Approved, Rejected }
    ClaimStatus public claimStatus;

    struct Incident {
        uint256 timestamp;
        string description;
        bool isValid;
    }

    mapping(address => Incident) public incidents;

    // Event to notify insurance claim updates
    event ClaimSubmitted(address indexed vehicleOwner, uint256 timestamp, uint256 claimAmount);
    event ClaimApproved(address indexed vehicleOwner, uint256 claimAmount);
    event ClaimRejected(address indexed vehicleOwner);

    modifier onlyInsurer() {
        require(msg.sender == insurer, "Only insurer can perform this action");
        _;
    }

    modifier onlyVehicleOwner() {
        require(msg.sender == vehicleOwner, "Only vehicle owner can perform this action");
        _;
    }

    constructor(address _insurer, address _vehicleOwner, uint256 _claimAmount) {
        insurer = _insurer;
        vehicleOwner = _vehicleOwner;
        claimAmount = _claimAmount;
        claimStatus = ClaimStatus.Pending;
        claimProcessed = false;
    }

    // Function for vehicle owner to submit an incident
    function submitIncident(uint256 timestamp, string memory description) public onlyVehicleOwner {
        incidents[vehicleOwner] = Incident(timestamp, description, false);
        emit ClaimSubmitted(vehicleOwner, timestamp, claimAmount);
    }

    // Function for insurer to validate incident
    function validateIncident(address _vehicleOwner) public onlyInsurer {
        // In a real-world scenario, we'd fetch data from the vehicle sensors
        // For demonstration, we assume the incident is validated here
        Incident storage incident = incidents[_vehicleOwner];
        
        // Validate the incident based on vehicle data (simplified logic here)
        if (bytes(incident.description).length > 0 && block.timestamp - incident.timestamp < 72 hours) {
            incident.isValid = true;
            claimStatus = ClaimStatus.Approved;
            emit ClaimApproved(_vehicleOwner, claimAmount);
        } else {
            incident.isValid = false;
            claimStatus = ClaimStatus.Rejected;
            emit ClaimRejected(_vehicleOwner);
        }
    }

    // Function for insurer to process the claim and release funds
    function processClaim() public onlyInsurer {
        require(claimStatus == ClaimStatus.Approved, "Claim not approved");
        require(!claimProcessed, "Claim already processed");

        // Transfer the claim amount to the vehicle owner
        payable(vehicleOwner).transfer(claimAmount);
        claimProcessed = true;
    }

    // Function to view the status of the claim
    function getClaimStatus() public view returns (ClaimStatus) {
        return claimStatus;
    }

    // Function to deposit insurance funds (for demonstration)
    function depositFunds() public payable onlyInsurer {}

}
