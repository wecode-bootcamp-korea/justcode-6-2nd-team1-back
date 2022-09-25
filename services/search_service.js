const searchDao = require("../models/search_dao");

const searchService = async (keyword) => {
  return await searchDao.getBeverageData(keyword);
};

module.exports = { searchService };
