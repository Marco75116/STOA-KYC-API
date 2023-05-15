const { ethers } = require("ethers");
const { addressDiamond } = require("../constants/address/diamond");
const { abiDiamond } = require("../constants/abi/diamond");
require("dotenv").config();

export const toggleWhitelist = async (payload) => {
  try {
    if (payload.reviewResult.reviewAnswer === "GREEN") {
      const provider = new ethers.providers.JsonRpcProvider(
        `https://polygon-mumbai.g.alchemy.com/v2/${process.env.API_KEY}`
      );
      const signer = ethers.Wallet(process.env.SECRET_KEY, provider);
      const diamond_Contract = await ethers.Contract(
        addressDiamond,
        abiDiamond,
        signer
      );
      await diamond_Contract.toggleWhitelist(payload.externalUserId);
    }
  } catch (error) {
    throw Error("toggleWhitelist failed: " + error);
  }
};
