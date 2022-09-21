const beverageDao = require("../models/beverage_dao");

const detailService = async (beverageId, userId) => {
  const [detailData] = await beverageDao.getDetailDataById(beverageId, userId);

  detailData.nutrition_data = JSON.parse(detailData.nutrition_data);

  detailData.review_data = JSON.parse(detailData.review_data);

  detailData.review_data.sort((a, b) => a.id - b.id);

  console.log(detailData.review_data);

  return detailData;
};

module.exports = { detailService };
