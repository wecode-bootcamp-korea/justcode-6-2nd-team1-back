const shopDao = require("../models/shop_dao");

const shopService = async () => {
  return await shopDao.getMapData();
};

module.exports = { shopService };
