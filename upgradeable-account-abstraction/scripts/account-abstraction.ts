import hre from 'hardhat';

async function main() {
    const ep = await hre.ethers.deployContract("EntryPoint");
    await ep.waitForDeployment();
    console.log(`EntryPoint deployed to: ${await ep.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});