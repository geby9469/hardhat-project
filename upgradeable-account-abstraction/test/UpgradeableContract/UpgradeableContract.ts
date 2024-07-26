import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import hre, { ethers, upgrades } from 'hardhat';

describe("UpgradeableContract", function () {
    async function deployUpgradeableContractFixture() {
      const [eoa, eoa2] = await hre.ethers.getSigners();

      // Deploy with Proxy
      const TokenFactory = await hre.ethers.getContractFactory("UpgradeableToken");
      const tokenProxy = await upgrades.deployProxy(TokenFactory, [await eoa.getAddress()]);

      // Upgrade new implementation with Proxy
      const TokenFactoryV2 = await hre.ethers.getContractFactory("UpgradeableTokenV2");
      const tokenProxyAddress = await tokenProxy.getAddress();
      const tokenProxyV2 = await upgrades.upgradeProxy(tokenProxyAddress, TokenFactoryV2);

      return { eoa, eoa2, tokenProxy, tokenProxyV2 };
    }

    describe("Token V1", function () {
      it("Transfer token from EOA to EOA2", async function () {
        const { eoa, eoa2, tokenProxy } = await loadFixture(deployUpgradeableContractFixture);

        await tokenProxy.transfer(eoa2, 1);

        expect(await tokenProxy.balanceOf(eoa)).to.be.equal(9);
      });
    });

    describe("Token V2", function () {
      it("Transfer token from EOA to EOA2", async function () {
        const { eoa, eoa2, tokenProxyV2 } = await loadFixture(deployUpgradeableContractFixture);

        await tokenProxyV2.transfer(eoa2, 1);

        expect(await tokenProxyV2.balanceOf(eoa)).to.be.equal(9);
      });

      it("Check state variables in the Storage of V2", async function () {
        const { eoa, eoa2, tokenProxy, tokenProxyV2 } = await loadFixture(deployUpgradeableContractFixture);

        // Control the state variables through V1
        await tokenProxy.transfer(eoa2, 1);
        expect(await tokenProxy.balanceOf(eoa)).to.be.equal(9);
        expect(await tokenProxyV2.balanceOf(eoa)).to.be.equal(9);

        // Same flow as the above but V2
        await tokenProxyV2.transfer(eoa2, 1);
        expect(await tokenProxy.balanceOf(eoa)).to.be.equal(8);
        expect(await tokenProxyV2.balanceOf(eoa)).to.be.equal(8);

      });

      it("Check function version from only V2", async function () {
        const { tokenProxyV2 } = await loadFixture(deployUpgradeableContractFixture);

        await tokenProxyV2.setVersion();
        expect(await tokenProxyV2.version()).to.be.equal(1);
      });
    });
});