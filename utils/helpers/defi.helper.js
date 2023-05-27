const moment = require("moment");

const getRedeableDate = (dayTimestamp) => {
  return moment(dayTimestamp).format("YYYY-MM-DD");
};

const getCumulativeAmount = (arrayDataHistory) => {
  let arrayCumul = [];
  let amountCumulUSDFI = 0;
  let amountCumulETHFI = 0;
  let amountCumulBTCFI = 0;

  for (let i = 0; i < arrayDataHistory.length; i += 1) {
    amountCumulUSDFI += arrayDataHistory[i].amountUSDFI;
    amountCumulETHFI += arrayDataHistory[i].amountETHFI;
    amountCumulBTCFI += arrayDataHistory[i].amountBTCFI;
    arrayCumul.push({
      day: getRedeableDate(arrayDataHistory[i].day * 1000),
      amountUSDFI: amountCumulUSDFI,
      amountETHFI: amountCumulETHFI,
      amountBTCFI: amountCumulBTCFI,
      id: arrayDataHistory[i].id,
    });
  }

  return arrayCumul;
};

module.exports = {
  getCumulativeAmount,
};
