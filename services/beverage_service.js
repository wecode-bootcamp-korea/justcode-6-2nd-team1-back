const beverageDao = require("../models/beverage_dao");

const detailService = async (beverageId) => {
  const [detailData] = await beverageDao.getDetailDataById(beverageId);

  detailData.nutrition_data = JSON.parse(detailData.nutrition_data);

  detailData.review_data = JSON.parse(detailData.review_data);

  if (detailData.review_data) {
    detailData.review_data.sort((a, b) => a.id - b.id);
  } else if (!detailData.review) {
    detailData.review_data == null;
  }
  return detailData;
};

const OrderService = async (
  userId,
  beverageId,
  amount,
  cold,
  totalPrice,
  takeOut,
  sugar,
  ice
) => {
  await beverageDao.createOrder(
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

const OrderToppingsService = async (userId, beverageId, toppings) => {
  for (let i = 0; i < toppings.length; i++) {
    await beverageDao.createToppings(userId, beverageId, toppings[i]);
  }
};

const orderDataService = async (userId, beverageId) => {
  const [orderData] = await beverageDao.getOrderData(userId, beverageId);
  console.log(orderData);
  orderData.toppingData = JSON.parse(orderData.toppingData);
  return orderData;
};

const categoryDetailService = async (categoryId) => {
  const beverageData = await beverageDao.getBeverageDataById(categoryId);
  return beverageData;
};

const paymentService = async (userId, orderId) => {
  await beverageDao.ModifyOrderStatus(orderId);
  await beverageDao.ModifyUserPoint(userId, orderId);
};
module.exports = {
  detailService,
  categoryDetailService,
  OrderService,
  OrderToppingsService,
  orderDataService,
  paymentService,
};
