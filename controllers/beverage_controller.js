const beverageService = require("../services/beverage_service");

const detailController = async (req, res) => {
  const beverageId = req.params.id;

  try {
    const detailData = await beverageService.detailService(beverageId);
    res.status(200).json({ detailData });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const categoryDetailcontroller = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const beverageData = await beverageService.categoryDetailService(
      categoryId
    );
    res.status(200).json({ beverageData });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const OrderController = async (req, res) => {
  const beverageId = req.params.id;
  const userId = req.userData.id;
  const { amount, cold, totalPrice, takeOut, sugar, ice, toppings } = req.body;

  try {
    await beverageService.OrderService(
      userId,
      beverageId,
      amount,
      cold,
      totalPrice,
      takeOut,
      sugar,
      ice
    );

    await beverageService.OrderToppingsService(userId, beverageId, toppings);

    const orderData = await beverageService.orderDataService(
      userId,
      beverageId
    );
    res.status(200).json({ orderData });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const paymentController = async (req, res) => {
  const userId = req.userData.id;
  const orderId = req.params.id;
  try {
    await beverageService.paymentService(userId, orderId);
    res.status(200).json({ message: "completed Payment" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const CartController = async (req, res) => {
  const userId = req.userData.id;
  const beverageId = req.params.id;
  const { amount, cold, totalPrice, takeOut, sugar, ice, toppings } = req.body;
  try {
    await beverageService.CartService(
      userId,
      beverageId,
      amount,
      cold,
      totalPrice,
      takeOut,
      sugar,
      ice
    );

    await beverageService.CartToppingService(userId, beverageId, toppings);

    res.status(200).json({ message: "Added cart" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const cartDataController = async (req, res) => {
  const userId = req.userData.id;
  try {
    const cartData = await beverageService.cartDataService(userId);
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
  try {
    await beverageService.cartModifyService(userId, orderId, amount);
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
    await beverageService.cartDeleteService(userId, orderId);
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};
module.exports = {
  detailController,
  categoryDetailcontroller,
  OrderController,
  paymentController,
  CartController,
  cartDataController,
  cartModifyController,
  cartDeleteController,
};
