import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import * as EntryPointContract from "../deployments/chain-31337/deployed_addresses.json";

const AccountContractFactoryModule = buildModule("AccountContractFactoryModule", (m) => {
    // Before deploying, you can deploy entrypoint contract first.
    const entryPoint = EntryPointContract["EntryPointModule#EntryPoint"];

    const accountContract = m.contract("SimpleAccountFactory", [entryPoint]);

    return { accountContract };
});

export default AccountContractFactoryModule;
