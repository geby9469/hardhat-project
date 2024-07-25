import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AccountContractModule = buildModule("AccountContractModule", (m) => {
    // Before deploying, you can deploy entrypoint contract first.
    const entryPoint = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  
    const accountContract = m.contract("AccountContract", [entryPoint]);
  
    return { accountContract };
});

export default AccountContractModule;
