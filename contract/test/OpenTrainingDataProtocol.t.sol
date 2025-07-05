// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Test } from "../lib/forge-std/src/Test.sol";
import { OpenTrainingDataProtocol } from "../src/OpenTrainingDataProtocol.sol";

contract OpenTrainingDataProtocolTest is Test {
    OpenTrainingDataProtocol protocol;
    address user = address(0x123);

    function setUp() public {
        protocol = new OpenTrainingDataProtocol();
    }

    function testProtocolVersion() public view {
        assertEq(protocol.PROTOCOL_VERSION(), 1);
    }

    function testStoreActivityAndGetters() public {
        // Prepare data
        uint8 activityType = 1;
        bytes32 fileId = bytes32(uint256(0xabc));
        uint32 timestamp = 1234567890;
        uint16 duration = 3600;

        vm.prank(user);
        protocol.storeActivity(activityType, fileId, timestamp, duration);

        // Get user activities
        bytes32[] memory ids = protocol.getUserActivities(user);
        assertEq(ids.length, 1);

        // Get activity details
        OpenTrainingDataProtocol.Activity memory act = protocol.getActivity(ids[0]);
        assertEq(act.user, user);
        assertEq(act.activityType, activityType);
        assertEq(act.fileId, fileId);
        assertEq(act.timestamp, timestamp);
        assertEq(act.duration, duration);
        assertEq(act.version, protocol.PROTOCOL_VERSION());
    }

    function testStoreActivityRevertsOnInvalidFileId() public {
        vm.expectRevert("Invalid fileId");
        protocol.storeActivity(1, bytes32(0), 1234567890, 100);
    }

    function testStoreActivityRevertsOnInvalidTimestamp() public {
        vm.expectRevert("Invalid timestamp");
        protocol.storeActivity(1, bytes32(uint256(0xabc)), 0, 100);
    }

    function testGetActivityRevertsIfNotFound() public {
        vm.expectRevert("Activity not found");
        protocol.getActivity(bytes32(uint256(0xdead)));
    }
}
