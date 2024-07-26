import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenModule = buildModule("TokenModule", (m) => {
  const tokenName = "TEST";
  const tokenSymbol = "TCW";

  const token = m.contract("Token", [tokenName, tokenSymbol]);

  // Upgradeable Token
  const upgradeableToken = m.contract("UpgradeableToken");
  const upgradeableTokenV2 = m.contract("UpgradeableTokenV2");

  return { token, upgradeableToken, upgradeableTokenV2 };
});

export default TokenModule;
