import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenModule = buildModule("TokenModule", (m) => {
  const tokenName = "TEST";
  const tokenSymbol = "TCW";

  const lock = m.contract("Token", [tokenName, tokenSymbol]);

  return { lock };
});

export default TokenModule;
