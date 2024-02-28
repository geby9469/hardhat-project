const { ethers, BigNumber } = require("ethers");
require("dotenv").config();

const PORT = process.env.PORT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const TOKEN_MINTER = process.env.TOKEN_MINTER;

// ERC20 token
const {
  abi,
} = require("./artifacts/contracts/ERC20_MyToken.sol/ERC20MyToken.json");
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

// running node
app.listen(PORT, () => {
  console.log(`API server is listening on port ${PORT}`);
});
