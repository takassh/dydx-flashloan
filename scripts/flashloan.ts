import * as dotenv from "dotenv";
import { ethers } from "hardhat";
import IERC20Artifact from "../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";
import FlashLoanArtifact from "../artifacts/contracts/FlashLoan.sol/FlashLoan.json";
import { FlashLoan, IERC20 } from "../src/types";

dotenv.config();

async function main() {
  console.log("start to deploy");

  const FlashLoan = await ethers.getContractFactory("FlashLoan");
  const flashLoan = await FlashLoan.deploy();

  await flashLoan.deployed();

  console.log("FlashLoan deployed to:", flashLoan.address);

  console.log("start dapp");

  // Connect to the network
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.KOVAN_SERVER_URL ?? ""
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  const contract = new ethers.Contract(
    flashLoan.address,
    FlashLoanArtifact.abi,
    wallet
  ) as FlashLoan;

  const logFilter = contract.filters["Log(string,uint256)"];

  contract.on(logFilter(), (message, val) => {
    console.log(`${message}: ${val}`);
  });

  const weth = new ethers.Contract(
    "0xd0A1E359811322d97991E03f863a0C30C2cF029C", // kovan weth
    IERC20Artifact.abi,
    wallet
  ) as IERC20;

  const feeAmount = 2;
  const loanAmount = ethers.utils.parseUnits("0.001", 18);

  const tx = await weth.transfer(contract.address, feeAmount);

  await tx.wait();

  console.log("transfered");

  const result = await contract.initiateFlashLoan(weth.address, loanAmount);

  const r = await result.wait();

  console.log(r.transactionHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
