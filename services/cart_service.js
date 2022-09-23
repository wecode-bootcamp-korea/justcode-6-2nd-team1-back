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
  if (!toppings) {
    await cartDao.createCartNullToppings(userId, beverageId);
  } else {
    for (let i = 0; i < toppings.length; i++) {
      await cartDao.createCartToppings(userId, beverageId, toppings[i]);
    }
  }
};

const cartDataService = async (userId) => {
  let cartData = await cartDao.getCartDataByUserId(userId);
  cartData.map((data) => {
    const parsedData = JSON.parse(data.toppingData);
    data.toppingData = parsedData;
    if (!parsedData[0].topping_id) {
      data.toppingData = [];
    }
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
