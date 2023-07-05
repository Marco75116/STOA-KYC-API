const moment = require("moment");

const getRedeableDate = (dayTimestamp) => {
  return moment(dayTimestamp).format("YYYY-MM-DD");
};

const getCumulativeAmount = (arrayDataHistory) => {
  try {
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
  } catch (error) {
    throw Error("getCumulativeAmount : failed" + error);
  }
};

const mula = (idPrevious, idCurrent, rCPTPrevious, rCPTCurrent) => {
  return rCPTPrevious / rCPTCurrent ** (365 / (idCurrent - idPrevious)) - 1;
};

const getArrayApy = (rowsData) => {
  try {
    const prevData = rowsData[0];
    const todayData = rowsData[1];

    const apyUSDFI = mula(
      prevData.id,
      todayData.id,
      prevData.rCPTUSDFI,
      todayData.rCPTUSDFI
    );
    const apyETHFI = mula(
      prevData.id,
      todayData.id,
      prevData.rCPTETHFI,
      todayData.rCPTETHFI
    );
    const apyBTCFI = mula(
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

module.exports = {
  getCumulativeAmount,
  getArrayApy,
};
