const beverageDao = require("../models/beverage_dao");

const detailService = async (beverageId) => {
  const [detailData] = await beverageDao.getDetailDataById(beverageId);

  detailData.nutrition_data = JSON.parse(detailData.nutrition_data);

  detailData.review_data = JSON.parse(detailData.review_data);

  if (detailData.review_data) {
    detailData.review_data.sort((a, b) => a.id - b.id);
  } else if (!detailData.review) {
    detailData.review_data = [];
  }
  return detailData;
};

const categoryDetailService = async (categoryId) => {
  const beverageData = await beverageDao.getBeverageDataById(categoryId);
  return beverageData;
};

module.exports = {
  detailService,
  categoryDetailService,
};
