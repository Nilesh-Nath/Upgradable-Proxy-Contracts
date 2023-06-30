const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;
  const chainId = network.config.chainId;
  const args = [];

  const tx = await deploy("BoxV2", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (chainId !== 31337 && ETHRSCAN_API_KEY) {
    await verify(tx.address, args);
  }
};

module.exports.tags = ["all", "boxV2"];
