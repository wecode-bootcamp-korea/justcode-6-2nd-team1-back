const { myDataSource } = require("./common");

const getMapData = async () => {
  return await myDataSource.query(
    `SELECT * FROM shops;
    `
  );
};

module.exports = { getMapData };
