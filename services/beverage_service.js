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

const categoryDetailService = async (categoryId) => {
  const beverageData = await beverageDao.getBeverageDataById(categoryId);
  return beverageData;
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

const paymentService = async (userId, orderId) => {
  await beverageDao.ModifyOrderStatus(orderId);
  await beverageDao.ModifyUserPoint(userId, orderId);
};

const CartService = async (
  userId,
  beverageId,
  amount,
  cold,
  totalPrice,
  takeOut,
  sugar,
  ice
) => {
  await beverageDao.createCart(
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

const CartToppingService = async (userId, beverageId, toppings) => {
  for (let i = 0; i < toppings.length; i++) {
    await beverageDao.createCartToppings(userId, beverageId, toppings[i]);
  }
};

const cartDataService = async (userId) => {
  const cartData = await beverageDao.getCartDataByUserId(userId);
  cartData.map((data) => {
    data.toppingData = JSON.parse(data.toppingData);
  });
  return cartData;
};
module.exports = {
  detailService,
  categoryDetailService,
  OrderService,
  OrderToppingsService,
  orderDataService,
  paymentService,
  CartService,
  CartToppingService,
  cartDataService,
};
