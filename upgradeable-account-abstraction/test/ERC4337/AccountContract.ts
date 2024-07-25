import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import hre, { ethers, upgrades } from 'hardhat';

describe("AccountContract", function () {
    async function deployAccountContractFixture() {
      const [eoa, otherEoa] = await hre.ethers.getSigners();
      const salt = 0;

      const EntryPoint = await hre.ethers.getContractFactory("EntryPoint");
      const AccountContract = await hre.ethers.getContractFactory("AccountContract");
      const AccountContractFactory = await hre.ethers.getContractFactory("SimpleAccountFactory");
      const Token = await hre.ethers.getContractFactory("Token");

      const entryPoint = await EntryPoint.deploy();
      const accountContract = await AccountContract.deploy(entryPoint);
      const accountContractFactory = await AccountContractFactory.deploy(entryPoint);
      const token = await Token.deploy("Test", "TCW");

      return { eoa, otherEoa, salt, entryPoint, accountContract, accountContractFactory, token };
    }

    describe("Deployment", function () {
      it("Check deploy", async function () {
        const { entryPoint, accountContract } = await loadFixture(deployAccountContractFixture);

        expect(await accountContract.entryPoint()).to.equal(entryPoint);
      });

      it("Check owner", async function () {
        const { accountContract } = await loadFixture(deployAccountContractFixture);

        expect(await accountContract.owner()).to.equal(ethers.ZeroAddress);
      });
    });

    describe("Execution", function () {
      it("Create AccountContract", async function () {
        const { eoa, salt, accountContractFactory  } = await loadFixture(deployAccountContractFixture);

        await accountContractFactory.createAccount(eoa, salt);
        const accountContract = await accountContractFactory.getAddress(eoa, salt);
        const deployedAccountContract = await ethers.getContractAt("AccountContract", accountContract);

        expect(deployedAccountContract.target).to.be.equal(accountContract);
      });

      it("Execute the function of ERC20 balanceOf through AccountContract", async function () {
        const { eoa, salt, accountContractFactory, token } = await loadFixture(deployAccountContractFixture);

        // Create AccountContract
        await accountContractFactory.createAccount(eoa, salt);
        const accountContract = await accountContractFactory.getAddress(eoa, salt);
        const deployedAccountContract = await ethers.getContractAt("AccountContract", accountContract);

        // destination smart contract(ERC20 token).
        const destAddress = await token.getAddress();

        // Ether
        const value = 0;

        // Encode the function of ERC20 token.
        const owner = await eoa.getAddress(); // token owner
        const callData = token.interface.encodeFunctionData('balanceOf', [owner]);

        const res = await deployedAccountContract.execute(destAddress, value, callData);
        // TODO: ProviderError: Error: Transaction reverted: function selector was not recognized and there's no fallback function
      });
    });
});