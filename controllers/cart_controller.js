const cartService = require("../services/cart_service");

const cartController = async (req, res) => {
  const userId = req.userData.id;
  const beverageId = req.params.id;
  const { amount, cold, totalPrice, takeOut, sugar, ice, toppings } = req.body;
  try {
    if (!toppings) {
      await cartService.cartService(
        userId,
        beverageId,
        amount,
        cold,
        totalPrice,
        takeOut,
        sugar,
        ice
      );

      await cartService.cartToppingService(userId, beverageId, toppings);

      res.status(200).json({ message: "Added cart" });
    } else {
      await cartService.cartService(
        userId,
        beverageId,
        amount,
        cold,
        totalPrice,
        takeOut,
        sugar,
        ice
      );

      await cartService.cartToppingService(userId, beverageId, toppings);
      res.status(200).json({ message: "Added cart" });
    }
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const cartDataController = async (req, res) => {
  const userId = req.userData.id;
  try {
    const cartData = await cartService.cartDataService(userId);
    res.status(200).json({ cartData });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const cartModifyController = async (req, res) => {
  const userId = req.userData.id;
  const orderId = req.params.id;
  const amount = req.params.amount;
  const totalPrice = req.params.total_price;
  try {
    await cartService.cartModifyService(userId, orderId, amount, totalPrice);
    res.status(200).json({ message: "completed Modify" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const cartDeleteController = async (req, res) => {
  const userId = req.userData.id;
  const orderId = req.params.id;

  try {
    await cartService.cartDeleteService(userId, orderId);
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  cartController,
  cartDataController,
  cartModifyController,
  cartDeleteController,
};
