const beverageService = require("../services/beverage_service");

const detailController = async (req, res) => {
  const beverageId = req.params.id;

  try {
    const detailData = await beverageService.detailService(beverageId);
    res.status(200).json({ detailData });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const categoryDetailcontroller = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const beverageData = await beverageService.categoryDetailService(
      categoryId
    );
    res.status(200).json({ beverageData });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const searchController = async (req, res) => {
  const keyword = req.query.keyword;
  try {
    const result = await beverageService.searchService(keyword);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};

module.exports = {
  detailController,
  categoryDetailcontroller,
  searchController,
};
