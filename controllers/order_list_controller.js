const orderListService = require("../services/order_list_sevice");

const orderListController = async (req, res) => {
  const userId = req.userData.id;
  try {
    const orderList = await orderListService.orderListService(userId);
    res.status(200).json(orderList);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};

module.exports = {
  orderListController,
};
