const { ethers, BigNumber } = require("ethers");
require("dotenv").config();

const PORT = process.env.PORT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const TOKEN_MINTER = process.env.TOKEN_MINTER;

// ERC20 token
const {
  abi,
} = require("./artifacts/contracts/ERC20/ERC20_MyToken.sol/ERC20MyToken.json");
const provider = new ethers.providers.JsonRpcProvider();
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

const express = require("express");
const app = express();
app.use(express.json());

// RESTful API
app.get("/totalsupply", async (req, res) => {
  try {
    const result = await contract.totalSupply();
    // convert number from hex
    const totalHex = result._hex;
    const totalSupply = BigNumber.from(totalHex).toString();
    console.log(`BJK ERC20 Token total supply = ${totalSupply}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/balance", async (req, res) => {
  try {
    const result = await contract.balanceOf(TOKEN_MINTER);
    // convert number from hex
    const balHex = result._hex;
    const balance = BigNumber.from(balHex).toString();
    console.log(`${TOKEN_MINTER}'s balance = ${balance}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/transfer", async (req, res) => {
  try {
    // receiver
    const receiver = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const txTransfer = await contract.transfer(receiver, 1000);
    await txTransfer.wait();
    console.log(
      `sender: ${TOKEN_MINTER}\nreceiver: ${receiver}\nsent token: 1000`
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// running node
app.listen(PORT, () => {
  console.log(`API server is listening on port ${PORT}`);
});
