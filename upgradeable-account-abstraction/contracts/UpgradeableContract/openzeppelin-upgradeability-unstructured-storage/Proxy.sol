// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

/**
 * @title Proxy
 * @dev Allows delegating any call to a foreign implementation.
 */
abstract contract Proxy {
    /**
     * @dev Returns the address of the implementation where every call will be delegated.
     * This must be implemented in the derived contract.
     */
    function implementation() public view virtual returns (address);

    /**
     * @dev Fallback function that delegates calls to the implementation.
     * Will run if no other function matches the call data.
     */
    fallback() external payable {
        address _impl = implementation();
        require(_impl != address(0), "Proxy: implementation address is 0");

        assembly {
            let ptr := mload(0x40) // Get free memory pointer
            calldatacopy(ptr, 0, calldatasize()) // Copy call data to memory

            let result := delegatecall(gas(), _impl, ptr, calldatasize(), 0, 0) // Delegate the call
            let size := returndatasize() // Get return data size

            returndatacopy(ptr, 0, size) // Copy return data to memory

            // Handle the result of the delegatecall
            switch result
            case 0 { revert(ptr, size) } // Revert on failure
            default { return(ptr, size) } // Return on success
        }
    }

    /**
     * @dev Receive function to accept Ether transfers.
     */
    receive() external payable {}
}
