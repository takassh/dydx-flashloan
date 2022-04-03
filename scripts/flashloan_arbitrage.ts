import * as dotenv from "dotenv";
import { ethers } from "hardhat";
import IERC20Artifact from "../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";
import FlashLoanArbitrageArtifact from "../artifacts/contracts/FlashLoanArbitrage.sol/FlashLoanArbitrage.json";
import { FlashLoanArbitrage, IERC20 } from "../src/types";

dotenv.config();

async function main() {
  console.log("start to deploy");

  const FlashLoanArbitrage = await ethers.getContractFactory(
    "FlashLoanArbitrage"
  );
  const flashLoanArbitrage = await FlashLoanArbitrage.deploy();

  await flashLoanArbitrage.deployed();

  console.log("FlashLoan deployed to:", flashLoanArbitrage.address);

  console.log("start dapp");

  // Connect to the network
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.KOVAN_SERVER_URL ?? ""
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  const contract = new ethers.Contract(
    flashLoanArbitrage.address,
    FlashLoanArbitrageArtifact.abi,
    wallet
  ) as FlashLoanArbitrage;

  const weth = new ethers.Contract(
    "0xd0A1E359811322d97991E03f863a0C30C2cF029C", // kovan weth
    IERC20Artifact.abi,
    wallet
  ) as IERC20;

  const logFilter = contract.filters["Log(string,uint256)"];

  contract.on(logFilter(), (message, val) => {
    console.log(`${message}: ${val}`);
  });

  const loanAmount = ethers.utils.parseUnits("1", 18);

  const uniswap = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; // kovan uniswap
  const sushiswap = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"; // kovan sushiswap

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
