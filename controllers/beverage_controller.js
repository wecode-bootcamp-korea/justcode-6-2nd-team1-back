const beverageService = require("../services/beverage_service");

const detailController = async (req, res) => {
  const beverageId = req.params.id;
  const userId = req.userData.id;

  try {
    const detailData = await beverageService.detailService(beverageId, userId);
    res.status(200).json({ detailData });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { detailController };
