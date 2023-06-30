const { ethers } = require("hardhat");

async function main() {
  const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin");
  const trasparentProxy = await ethers.getContract("Box_Proxy");
  const proxyAddress = await trasparentProxy.getAddress();

  const proxyBoxV1 = await ethers.getContractAt("Box", proxyAddress);
  const version1 = await proxyBoxV1.version();
  console.log(`Version Before the Upgrade : ${version1.toString()}`);

  const boxV2 = await ethers.getContract("BoxV2");
  const boxV2Address = await boxV2.getAddress();

  const upgradeTx = await boxProxyAdmin.upgrade(proxyAddress, boxV2Address);
  await upgradeTx.wait(1);

  const proxyBoxV2 = await ethers.getContractAt("BoxV2", proxyAddress);
  const version2 = await proxyBoxV2.version();
  console.log(`Version after the upgrade :${version2.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(-1);
  });
