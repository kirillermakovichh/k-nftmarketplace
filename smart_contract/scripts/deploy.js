const hre = require("hardhat");

async function main() {
  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftM = await NFTMarket.deploy();

  await nftM.deployed();

  console.log(`deployed to ${nftM.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});