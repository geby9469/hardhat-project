import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';

describe("Token", function () {
    async function deployTokenFixture() {
      const tokenName = "TEST";
      const tokenSymbol = "TCW";

      const [owner, otherAccount] = await hre.ethers.getSigners();
      const Token = await hre.ethers.getContractFactory("Token");
      const token = await Token.deploy(tokenName, tokenSymbol);

      return { owner, otherAccount, token };
    }

    describe("Deployment", function () {
      it("Should be owner", async function () {
        const { token } = await loadFixture(deployTokenFixture);

        expect(await token.name()).to.equal("TEST");
      });
    });
});