const hre = require("hardhat");

async function main() {
  const contractApi = await hre.ethers.getContractFactory("contractApi");
  const contractApi_ = await contractApi.deploy();

  await contractApi_.deployed();

  console.log(`Contract Address:  ${contractApi_.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
