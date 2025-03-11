# Hardhat and Dapp

This project demonstrates a basic hardhat and Decentralized app for transferring ERC-20 tokens.

## Directories Overview

contracts: Token.sol \
scripts: deploying Token.sol

## Build

### Hardhat

1. Set up

    ```shell
     yarn add hardhat
    ```

2. Start a local node

    ```sh
     npx hardhat node
    ```

    🛠 If you encounter an error related to [HH801](https://hardhat.org/hardhat-runner/docs/errors#HH801), you can install the necessary dependencies by running the following command:

    ```sh
     yarn add -D @types/mocha @typechain/ethers-v5 @typechain/hardhat ts-node typechain typescript
    ```

3. [Deploy a contract](https://hardhat.org/ignition/docs/guides/scripts#deploying-within-hardhat-scripts) and write the deployed file in a Dapp folder.

   ```sh
    npx hardhat run scripts/deploy.js --network localhost
   ```

### Dapp

1. Set up

    ```shell
    yarn install
    ```

2. Start a application

    ```shell
    yarn start
    ```

3. Roll out 🚛

    connect a Metamask wallet and transfer the token to a recipient. \
    ⚠️ You may encounter an error while loading the page to transfer your tokens. However, there is no issue, and we are currently working on a fix.
