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

const apyFormula = (idPrevious, idCurrent, rCPTPrevious, rCPTCurrent) => {
  const fee = 0.1;
  return (
    (rCPTPrevious / rCPTCurrent ** (365 / (idCurrent - idPrevious)) - 1) *
    (1 - fee)
  );
};

const getArrayApy = (rowsData) => {
  const prevData = rowsData[0];
  const todayData = rowsData[1];

  const apyUSDFI = apyFormula(
    prevData.id,
    todayData.id,
    prevData.rCPTUSDFI,
    todayData.rCPTUSDFI
  );
  const apyETHFI = apyFormula(
    prevData.id,
    todayData.id,
    prevData.rCPTETHFI,
    todayData.rCPTETHFI
  );
  const apyBTCFI = apyFormula(
    prevData.id,
    todayData.id,
    prevData.rCPTBTCFI,
    todayData.rCPTBTCFI
  );

  return {
    USDFI: apyUSDFI,
    ETHFI: apyETHFI,
    BTCFI: apyBTCFI,
  };
};

module.exports = {
  getCumulativeAmount,
  getArrayApy,
};
