import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import hre, { ethers, upgrades } from 'hardhat';
describe("Owned Upgradeability Proxy", function () {
    async function deployUnstructuredStorageFixture() {
        const [proxyOwner, notProxyOwner, newOwner, toAddress] = await hre.ethers.getSigners();

        const ownedUpgradeabilityProxyContract = await hre.ethers.getContractFactory("OwnedUpgradeabilityProxy");
        const newImplementationContract = await hre.ethers.getContractFactory("Token");
        const deployedOwnedUpgradeabilityProxyContract = await ownedUpgradeabilityProxyContract.deploy();
        const deployedNewImplementationContract = await newImplementationContract.deploy("TEST", "TCW");

        return { proxyOwner, notProxyOwner, newOwner, toAddress, deployedOwnedUpgradeabilityProxyContract, deployedNewImplementationContract };
    }

    describe("Transfer ownership", function () {
        it("Updating ownership to zero address", async function () {
            const { deployedOwnedUpgradeabilityProxyContract } = await loadFixture(deployUnstructuredStorageFixture);

            await expect(deployedOwnedUpgradeabilityProxyContract.transferProxyOwnership(ethers.ZeroAddress)).to.be.revertedWithoutReason();
        });

        it("Execute the function with an account that is not proxy owner to test the modifier", async function () {
            const { notProxyOwner, newOwner, deployedOwnedUpgradeabilityProxyContract } = await loadFixture(deployUnstructuredStorageFixture);

            await expect(deployedOwnedUpgradeabilityProxyContract.connect(notProxyOwner).transferProxyOwnership(newOwner)).to.be.revertedWithoutReason();
        });

        it("Success", async function () {
            const { newOwner, deployedOwnedUpgradeabilityProxyContract } = await loadFixture(deployUnstructuredStorageFixture);

            await deployedOwnedUpgradeabilityProxyContract.transferProxyOwnership(newOwner);

            expect(await deployedOwnedUpgradeabilityProxyContract.proxyOwner()).to.be.equal(newOwner);
        });
    });

    describe("Upgrade to new implementation contract", function () {
        it("Execute the function with an account that is not proxy owner to test the modifier", async function () {
            const { notProxyOwner, deployedOwnedUpgradeabilityProxyContract, deployedNewImplementationContract } = await loadFixture(deployUnstructuredStorageFixture);

            await expect(deployedOwnedUpgradeabilityProxyContract.connect(notProxyOwner).upgradeTo(deployedNewImplementationContract)).to.be.revertedWithoutReason();
        });

        it("The new implementation is the same as the current implementation", async function () {
            const { deployedOwnedUpgradeabilityProxyContract } = await loadFixture(deployUnstructuredStorageFixture);

            await expect(deployedOwnedUpgradeabilityProxyContract.upgradeTo(ethers.ZeroAddress)).to.be.revertedWithoutReason();
        });

        it("Success", async function () {
            const { deployedOwnedUpgradeabilityProxyContract, deployedNewImplementationContract } = await loadFixture(deployUnstructuredStorageFixture);

            await deployedOwnedUpgradeabilityProxyContract.upgradeTo(deployedNewImplementationContract);

            expect(await deployedOwnedUpgradeabilityProxyContract.implementation()).to.be.equal(deployedNewImplementationContract);
        });
    });

    describe("Upgrade to new implementation contract", function () {
        it("Execute the function with an account that is not proxy owner to test the modifier", async function () {
            const { notProxyOwner, deployedOwnedUpgradeabilityProxyContract, deployedNewImplementationContract } = await loadFixture(deployUnstructuredStorageFixture);

            await expect(deployedOwnedUpgradeabilityProxyContract.connect(notProxyOwner).upgradeTo(deployedNewImplementationContract)).to.be.revertedWithoutReason();
        });

        it("The new implementation is the same as the current implementation", async function () {
            const { deployedOwnedUpgradeabilityProxyContract } = await loadFixture(deployUnstructuredStorageFixture);

            await expect(deployedOwnedUpgradeabilityProxyContract.upgradeTo(ethers.ZeroAddress)).to.be.revertedWithoutReason();
        });

        it("Success", async function () {
            const { deployedOwnedUpgradeabilityProxyContract, deployedNewImplementationContract } = await loadFixture(deployUnstructuredStorageFixture);

            await deployedOwnedUpgradeabilityProxyContract.upgradeTo(deployedNewImplementationContract);

            expect(await deployedOwnedUpgradeabilityProxyContract.implementation()).to.be.equal(deployedNewImplementationContract);
        });
    });

    describe("Upgrade to new implementation contract with calldata", function () {
        it("Too many token tranfered to revert", async function () {
            const { toAddress, deployedOwnedUpgradeabilityProxyContract, deployedNewImplementationContract } = await loadFixture(deployUnstructuredStorageFixture);

            const calldata = deployedNewImplementationContract.interface.encodeFunctionData('transfer', [await toAddress.getAddress(), 100]);

            await expect(deployedOwnedUpgradeabilityProxyContract.upgradeToAndCall(deployedNewImplementationContract, calldata)).to.be.revertedWith("Call to new implementation failed");
        });

        it("Success", async function () {
            const { notProxyOwner, toAddress, deployedOwnedUpgradeabilityProxyContract, deployedNewImplementationContract } = await loadFixture(deployUnstructuredStorageFixture);

            // TODO: ERC20 approve and then transferFrom.
        });
    });
})