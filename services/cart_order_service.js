const cartOrderDao = require("../models/cart_order_dao");
const orderDao = require("../models/order_dao");

const cartOrderService = async (userId, orderId) => {
  for (let i in orderId) {
    await cartOrderDao.modifyCartOrderStatusByOrderId(orderId[i].id);
  }
  const [userData] = await cartOrderDao.getCartUserDataByUserId(userId);
  const beverageData = await cartOrderDao.getBeverageDataByUserId(userId);
  const [totalPrice] = await cartOrderDao.getCartTotalPrice(userId);
  beverageData.map((data) => {
    const parsedData = JSON.parse(data.toppingData);
    data.toppingData = parsedData;
    if (!parsedData[0].topping_id) {
      data.toppingData = [];
    }
  });
  userData.beverageData = beverageData;
  userData.totalPrice = totalPrice.totalPrice;
  return userData;
};

const cartOrderPaymentService = async (userId, orderId) => {
  await cartOrderDao.modifyCartOrderUserPoint(userId, orderId);

  for (let i in orderId) {
    await orderDao.modifyOrderStatus(orderId[i].id);
  }
};

module.exports = {
  cartOrderService,
  cartOrderPaymentService,
};
