const searchService = require("../services/search_service");

const searchController = async (req, res) => {
  const keyword = req.query.keyword;
  try {
    const result = await searchService.searchService(keyword);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};

module.exports = { searchController };
