const shopService = require("../services/shop_service");

const shopController = async (req, res) => {
  try {
    const result = await shopService.shopService();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};

module.exports = { shopController };
