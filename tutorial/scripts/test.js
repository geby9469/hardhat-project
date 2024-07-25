const hre = require("hardhat");

async function main() {
  const test = await hre.ethers.getContractFactory("Test");
  const t = await test.deploy();
  console.log(`Test info : ${t}`);
  console.log(`Test contract deployed to : ${t.target}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
