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
    
    // Pre-determined activity types
    uint8 public constant ACTIVITY_TYPE_SWIM = 0;
    uint8 public constant ACTIVITY_TYPE_BIKE = 1;
    uint8 public constant ACTIVITY_TYPE_RUN = 2;
    
    struct Activity {
        address user;   
        uint8 version;            // Protocol version when stored
        uint32 timestamp;         // Activity timestamp
        uint8 activityType;       // Activity type ID (0-255). 0: Swim, 1: Bike, 2: Run
        uint32 duration;          // Duration in seconds
        bytes32 fileId;           // Encoded Walrus fileId
    }

    // Storage mappings
    mapping(bytes32 => Activity) public activities;
    mapping(address => bytes32[]) public userActivities;
    mapping(address => uint256) public userActivityCount;

    // Events
    event ActivityStored(
        uint8 indexed activityType,
        bytes32 indexed activityId,
        address indexed user,
        uint32 timestamp
    );

    constructor() {
        // Contract deployed and ready
    }
    
    /**
        * @dev Store a new activity
     * @param fileId Hash of the Walrus uploadId
     * @param activityType Activity type ID (0: Swim, 1: Bike, 2: Run)
     * @param timestamp Activity timestamp
     * @param duration Duration in seconds
     */
    function storeActivity(
        uint8 activityType,
        bytes32 fileId,
        uint32 timestamp,
        uint16 duration
    ) external {
        require(fileId != bytes32(0), "Invalid fileId");
        require(timestamp > 0, "Invalid timestamp");
        
        // Generate unique workout ID
        bytes32 activityId = keccak256(abi.encodePacked(
            msg.sender,
            fileId,
            timestamp,
            block.timestamp
        ));
        
        require(activities[activityId].user == address(0), "Activity already exists");
        
        // Store workout
        activities[activityId] = Activity({
            user: msg.sender,
            fileId: fileId,
            activityType: activityType,
            timestamp: timestamp,
            duration: duration,
            version: PROTOCOL_VERSION
        });
        
        // Update user mappings
        userActivities[msg.sender].push(activityId);
        userActivityCount[msg.sender]++;
        
        emit ActivityStored(activityType, activityId, msg.sender, timestamp);
    }
    
    /**
     * @dev Get all activity IDs for a user
     * @param user User address
     * @return Array of activity IDs
     */
    function getUserActivities(address user) external view returns (bytes32[] memory) {
        return userActivities[user];
    }
    
    /**
     * @dev Get activity details
     * @param activitiyId Activity ID
     * @return Activity struct (if it exists)
     */
    function getActivity(bytes32 activitiyId) external view returns (Activity memory) {
        Activity memory activity = activities[activitiyId];
        require(activity.user != address(0), "Activity not found");
        return activity;
    }

}
