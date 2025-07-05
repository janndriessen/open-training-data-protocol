// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title OpenTrainingDataProtocol
 * @dev Decentralized protocol for storing training data references on Zircuit 
 * with off-chain storage on Walrus
 */
contract OpenTrainingDataProtocol {
    
    // Protocol version
    uint8 public constant PROTOCOL_VERSION = 1;
    
    struct Activity {
        address user;   
        uint8 version;            // Protocol version when stored
        uint32 timestamp;         // Activity timestamp
        uint8 activityType;       // Activity type ID (0-255)
        uint16 duration;          // Duration in seconds
        bytes32 fileId;           // Encoded Walrus fileId
    }
}
