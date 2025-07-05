// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import {OpenTrainingDataProtocol} from "../src/OpenTrainingDataProtocol.sol";

contract OpenTrainingDataProtocolScript is Script {
    function run() public {
        vm.startBroadcast();
        new OpenTrainingDataProtocol();
        vm.stopBroadcast();
    }
}
