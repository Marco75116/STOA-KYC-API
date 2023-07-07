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

const reverse = (number) => {
  return 1 / number;
};

const aprToApy = (apr) => {
  const rebasePerYear = 365;
  return (1 + apr / rebasePerYear) ** rebasePerYear - 1;
};

const apyFormula = (idPrevious, idCurrent, rCPTPrevious, rCPTCurrent) => {
  if (rCPTCurrent && rCPTPrevious) {
    const apr =
      ((reverse(rCPTCurrent) - reverse(rCPTPrevious)) / reverse(rCPTPrevious)) *
      (365 / (idCurrent - idPrevious));
    return aprToApy(apr);
  } else {
    return 0;
  }
};

const getArrayApy = (rowsData) => {
  try {
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
  } catch (error) {
    throw Error("getgetArrayApy failed caused by ", error);
  }
};

const getDepositArray = (rowsData) => {
  const { depositUSDFI, depositETHFI, depositBTCFI } = rowsData;
  return {
    USDFI: depositUSDFI,
    ETHFI: depositETHFI,
    BTCFI: depositBTCFI,
  };
};

module.exports = {
  getCumulativeAmount,
  getArrayApy,
  getDepositArray,
};
