const cartDao = require("../models/cart_dao");

const cartService = async (
  userId,
  beverageId,
  amount,
  cold,
  totalPrice,
  takeOut,
  sugar,
  ice
) => {
  await cartDao.createCart(
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

const cartToppingService = async (userId, beverageId, toppings) => {
  for (let i = 0; i < toppings.length; i++) {
    await cartDao.createCartToppings(userId, beverageId, toppings[i]);
  }
};

const cartDataService = async (userId) => {
  const cartData = await cartDao.getCartDataByUserId(userId);
  cartData.map((data) => {
    data.toppingData = JSON.parse(data.toppingData);
  });
  return cartData;
};

const cartModifyService = async (userId, orderId, amount) => {
  await cartDao.modifyCart(userId, orderId, amount);
};

const cartDeleteService = async (userId, orderId) => {
  await cartDao.deleteCart(userId, orderId);
};

module.exports = {
  cartService,
  cartToppingService,
  cartDataService,
  cartModifyService,
  cartDeleteService,
};
