const { ethers } = require("ethers");
const { addressDiamond } = require("../constants/address/diamond");
const { abiDiamond } = require("../constants/abi/diamond");
require("dotenv").config();

const toggleWhitelist = async (payload) => {
  try {
    if (true) {
      const provider = new ethers.JsonRpcProvider(
        `https://polygon-mumbai.g.alchemy.com/v2/${process.env.API_KEY}`
      );
      const signer = new ethers.Wallet(process.env.SECRET_KEY, provider);
      const diamond_Contract = await new ethers.Contract(
        addressDiamond,
        abiDiamond,
        signer
      );
      await diamond_Contract.toggleWhitelist(
        "0x01738387092E007CcB8B5a73Fac2a9BA23cf91d3"
      );
    }
  } catch (error) {
    throw Error("toggleWhitelist failed: " + error);
  }
};

module.exports = {
  toggleWhitelist,
};
