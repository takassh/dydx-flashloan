import * as dotenv from "dotenv";
import { ethers } from "hardhat";
import IERC20Artifact from "../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";
import FlashLoanArbitrageArtifact from "../artifacts/contracts/FlashLoanArbitrage.sol/FlashLoanArbitrage.json";
import { FlashLoanArbitrage, IERC20 } from "../src/types";

dotenv.config();

async function main() {
  console.log("start to deploy");

  const V3FlashLoan = await ethers.getContractFactory("V3FlashLoan");
  const flashLoan = await V3FlashLoan.deploy();

  await flashLoan.deployed();

  console.log("FlashLoan deployed to:", flashLoan.address);

  console.log("start dapp");

  // Connect to the network
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.MAIN_SERVER_URL ?? ""
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  const contract = new ethers.Contract(
    flashLoan.address,
    FlashLoanArbitrageArtifact.abi,
    wallet
  ) as FlashLoanArbitrage;

  const weth = new ethers.Contract(
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // weth
    IERC20Artifact.abi,
    wallet
  ) as IERC20;

  const loanAmount = ethers.utils.parseUnits("0.001", 18);

  const uniswap = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const sushiswap = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";

  const result = await contract.initiateFlashLoan(
    weth.address,
    loanAmount,
    uniswap,
    sushiswap
  );

  const r = await result.wait();

  console.log(r.transactionHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
