# Hardhat And Typescript Project

## Directories

### contracts

- UpgradeableContract
  - [openzeppelin-upgradeability-unstructured-storage](https://github.com/OpenZeppelin/openzeppelin-labs/tree/master/upgradeability_using_unstructured_storage): updated the code to solidity compiler 0.8.24 and simply can test upgrade.
    - OwnedUpgradeabilityProxy: an upgradeability proxy with basic authorization control functionalities
    - UpgradeabilityProxy: a proxy where the implementation address to which it will delegate can be upgraded
    - Proxy: gives the possibility to delegate any call to a foreign implementation.
  - Universal Upgradeable Proxy Standard (UUPS): WIP 🚧
- ERC4337
  - [AccountContract](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/samples/SimpleAccount.sol)
- ERC20
  - [Token](https://docs.openzeppelin.com/contracts/5.x/erc20)