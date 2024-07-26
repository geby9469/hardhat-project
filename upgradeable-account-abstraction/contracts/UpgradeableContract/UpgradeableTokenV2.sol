// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./UpgradeableToken.sol";

contract UpgradeableTokenV2 is UpgradeableToken {
    uint256 public version;

    function setVersion() public {
        version += 1;
    }
}