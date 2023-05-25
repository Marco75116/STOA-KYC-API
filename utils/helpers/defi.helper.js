const moment = require("moment");

const getRedeableDate = (dayTimestamp) => {
  return moment(dayTimestamp).format("YYYY-MM-DD");
};

const getCumulativeAmount = (arrayDataHistory) => {
  let tableauCumul = [];
  let montantCumul = 0;

  for (let i = 0; i < arrayDataHistory.length; i += 1) {
    montantCumul += arrayDataHistory[i].amount;
    tableauCumul.push({
      day: getRedeableDate(arrayDataHistory[i].day * 1000),
      amount: montantCumul,
      id: arrayDataHistory[i].id,
    });
  }

  return tableauCumul;
};

module.exports = {
  getCumulativeAmount,
};
