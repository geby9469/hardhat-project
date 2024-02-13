const { ethers } = require("ethers");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PORT = process.env.PORT;

const {
  abi,
} = require("./artifacts/contracts/ERC20_MyToken.sol/ERC20MyToken.json");
const provider = new ethers.providers.JsonRpcProvider();
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

const express = require("express");
const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`API server is listening on port ${PORT}`);
});

// RESTful API
app.get("/totalsupply", async (req, res) => {
  try {
    const totalSupply = await contract.totalSupply();
    console.log(totalSupply);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
