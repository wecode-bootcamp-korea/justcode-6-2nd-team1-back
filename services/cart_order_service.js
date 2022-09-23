const cartOrderDao = require("../models/cart_order_dao");
const orderDao = require("../models/order_dao");

const cartOrderService = async (userId) => {
  await cartOrderDao.modifyCartOrderStatusByUserId(userId);
  const [userData] = await cartOrderDao.getCartUserDataByUserId(userId);
  const beverageData = await cartOrderDao.getBeverageDataByUserId(userId);
  const [totalPrice] = await cartOrderDao.getTotalPriceByUserId(userId);
  beverageData.map((data) => {
    data.toppingData = JSON.parse(data.toppingData);
  });
  userData.beverageData = beverageData;
  userData.totalPrice = totalPrice.totalPrice;
  return userData;
};

const cartOrderPaymentService = async (userId, orderId) => {
  const [totalPrice] = await cartOrderDao.getTotalPrice(userId);

  for (let i in orderId) {
    await orderDao.modifyOrderStatus(orderId[i].id);
  }

  await cartOrderDao.modifyCartOrderUserPoint(userId, totalPrice.totalPrice);
};

module.exports = {
  cartOrderService,
  cartOrderPaymentService,
};
