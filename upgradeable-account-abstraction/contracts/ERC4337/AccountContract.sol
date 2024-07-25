// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@account-abstraction/contracts/samples/SimpleAccount.sol";
import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/samples/SimpleAccountFactory.sol";

contract AccountContract is SimpleAccount {
    constructor(IEntryPoint anEntryPoint) SimpleAccount(anEntryPoint) {}
}