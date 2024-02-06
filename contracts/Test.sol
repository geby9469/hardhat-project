// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Test {
    uint public a; // uint is aliases for uint256, respectively.

    // view: read state variable
    function getA() public view returns (uint) {
        return a;
    }

    function setA(uint _a) public {
        a = _a;
    }

    function setA2(uint _a) public {
        a = _a * 2;
    }
}
