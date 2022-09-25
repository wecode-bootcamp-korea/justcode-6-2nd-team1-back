const orderDao = require("../models/order_dao");

const orderService = async (
  userId,
  beverageId,
  amount,
  cold,
  totalPrice,
  takeOut,
  sugar,
  ice
) => {
  await orderDao.createOrder(
    userId,
    beverageId,
    amount,
    cold,
    totalPrice,
    takeOut,
    sugar,
    ice
  );
};

const orderToppingsService = async (userId, beverageId, toppings) => {
  if (!toppings) {
    await orderDao.createToppingsNull(userId, beverageId);
  } else {
    for (let i = 0; i < toppings.length; i++) {
      await orderDao.createToppings(userId, beverageId, toppings[i]);
    }
  }
};
const orderDataWithOutToppingService = async (userId, beverageId) => {
  const [orderData] = await orderDao.getOrderDataWithoutTopping(
    userId,
    beverageId
  );
  if (!orderData.toppingData.topping_id) {
    orderData.toppingData = [];
  }
  return orderData;
};

const orderDataService = async (userId, beverageId) => {
  const [orderData] = await orderDao.getOrderData(userId, beverageId);
  orderData.toppingData = JSON.parse(orderData.toppingData);
  return orderData;
};

const paymentService = async (userId, orderId) => {
  await orderDao.modifyUserPoint(userId, orderId);
  await orderDao.modifyOrderStatus(orderId);
};

const orderCancelService = async (userId, orderId) => {
  await orderDao.modifyCancelOrder(userId, orderId);
};

module.exports = {
  orderService,
  orderToppingsService,
  orderDataService,
  orderDataWithOutToppingService,
  paymentService,
  orderCancelService,
};
