import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import hre, { ethers } from 'hardhat';

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

    describe("EntryPoint", function () {
      it("Should verify that the Entrypoint contract is deployed", async function () {
        const { entryPoint, accountContract } = await loadFixture(deployAccountContractFixture);

        expect(await accountContract.entryPoint()).to.equal(entryPoint);
      });

      it("Should send 1 ether via EntryPoint's handleOps using a UserOperation", async function () {
        const {} = await loadFixture(deployAccountContractFixture);

        // * NOTE: Skipped here since it's already implemented in the nestjs-project.
        // Please refer to the link below as the test code has already been implemented.
        // For more information, see https://github.com/eth-infinitism/account-abstraction/blob/develop/test/UserOp.ts#L381
      });
    });

    describe("AccountContract", function () {
      it("Should ensure the AccountContract owner is the EOA and the Entrypoint matches the deployed one", async function () {
        const { eoa, salt, entryPoint, accountContractFactory  } = await loadFixture(deployAccountContractFixture);

        await accountContractFactory.createAccount(eoa, salt);
        // * IMPORTANT: If you call getAddress directly, it will return the Factory contract's address,
        // so you must use getFunction to call it instead.
        const accountContract = await accountContractFactory.getFunction('getAddress')(eoa, salt);
        const deployedAccountContract = await ethers.getContractAt("AccountContract", accountContract);

        expect(entryPoint.target).to.be.equal(await deployedAccountContract.entryPoint());
        expect(eoa.address).to.be.equal(await deployedAccountContract.owner());
      });

      it("Should send 1 ether through the AccountContract", async function () {
        const { eoa, otherEoa, salt, accountContractFactory, token } = await loadFixture(deployAccountContractFixture);

        await accountContractFactory.createAccount(eoa, salt);
        const accountContract = await accountContractFactory.getFunction('getAddress')(eoa, salt);
        const deployedAccountContract = await ethers.getContractAt("AccountContract", accountContract);

        // Pre-fund the AccountContract with tokens
        await token.transfer(deployedAccountContract.target, 1);

        // Set the token contract address
        // Encode the call data for the ERC20 token transfer function
        await deployedAccountContract.execute(await token.getAddress(), 0, token.interface.encodeFunctionData('transfer', [otherEoa.address, 1]));

        expect(await token.balanceOf(eoa.address)).to.be.equal(9);
        expect(await token.balanceOf(otherEoa.address)).to.be.equal(1);
      });
    });
});