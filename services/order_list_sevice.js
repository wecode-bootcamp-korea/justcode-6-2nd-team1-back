const orderListDao = require("../models/order_list_dao");

const orderListService = async (userId) => {
  return await orderListDao.getOrderListByUserId(userId);
};

module.exports = { orderListService };
