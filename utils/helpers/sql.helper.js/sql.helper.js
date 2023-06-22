const { createPool } = require("mysql");
const { getDayTimestamp } = require("../global.helper.js/global.helper");
const { promisify } = require("util");

require("dotenv").config();

const pool = createPool({
  host: process.env.Host,
  user: process.env.User,
  password: process.env.Password,
  database: process.env.Database,
  connectionLimit: 10,
});

const selectAll = async () => {
  const dayTimestamp = getDayTimestamp();
  pool.query(
    `SELECT * FROM graph WHERE day<=${dayTimestamp}`,
    (err, result, fields) => {
      if (err) {
        return console.error("err", err);
      }
    }
  );
};

const insertDataOffChain = (address, dayTimestamp) => {
  if (address !== undefined && address.length !== 0) {
    const query = promisify(pool.query).bind(pool);

    const firstQuery = () => {
      return query(`SELECT * FROM dataOffChain WHERE wallet='${address}' `);
    };

    const secondQuery = () => {
      return query(
        `INSERT INTO dataOffChain (wallet,amountConnexion,lastConnexion) VALUES ('${address}',1,${dayTimestamp})`
      );
    };

    const thirdQuery = () => {
      return query(
        `UPDATE dataOffChain set amountConnexion=amountConnexion+1, lastConnexion=${dayTimestamp}  WHERE wallet = '${address}'`
      );
    };

    firstQuery()
      .then((results) => {
        if (results.length === 0) {
          return secondQuery();
        } else {
          return thirdQuery();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // pool.end();
      });
  }
};

module.exports = {
  selectAll,
  pool,
  insertDataOffChain,
};
