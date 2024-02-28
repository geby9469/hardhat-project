// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EtherToTokenSwap {
    ERC20 public token;
    uint public rate = 100; // 1 ETH : 100 Token

    constructor(ERC20 _token) {
        token = _token;
    }

    // swap ether to token
    function ethToToken() public payable {
        uint256 tokenAmount = msg.value*rate;
        require(token.balanceOf(address(this)) >= tokenAmount, "Insufficient token balance in SwapCA");
        token.transfer(msg.sender, tokenAmount);
    }

    // swap token to ether
    function tokenToEth(uint256 _tokenAmount) public payable {
        require(token.balanceOf(msg.sender) >= _tokenAmount);
        uint256 etherAmount = _tokenAmount/rate;

        require(address(this).balance >= etherAmount, "Insufficient ether balance in SwapCA");
        token.transferFrom(msg.sender, address(this), _tokenAmount);
        payable(msg.sender).transfer(etherAmount);
    }

}