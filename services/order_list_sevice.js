const orderListDao = require("../models/order_list_dao");

const orderListService = async (userId) => {
  const orderList = await orderListDao.getOrderListByUserId(userId);
  orderList.map((data) => {
    data.toppings = JSON.parse(data.toppings);
    if (!data.toppings[0].amount) {
      data.toppings = [];
    }
  });
  return orderList;
};

module.exports = { orderListService };
