const orderService = require("../services/order_service");
const commonDao = require("../models/common");

const orderController = async (req, res) => {
  const beverageId = req.params.id;
  const userId = req.userData.id;
  let { amount, cold, totalPrice, takeOut, sugar, ice, toppings } = req.body;
  try {
    if (!toppings.length) {
      await orderService.orderService(
        userId,
        beverageId,
        amount,
        cold,
        totalPrice,
        takeOut,
        sugar,
        ice
      );
      await orderService.orderToppingsService(userId, beverageId, toppings);
      const orderData = await orderService.orderDataWithOutToppingService(
        userId,
        beverageId
      );
      res.status(200).json({ orderData });
    } else {
      await orderService.orderService(
        userId,
        beverageId,
        amount,
        cold,
        totalPrice,
        takeOut,
        sugar,
        ice
      );

      await orderService.orderToppingsService(userId, beverageId, toppings);
      const orderData = await orderService.orderDataService(userId, beverageId);
      res.status(200).json({ orderData });
    }
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const paymentController = async (req, res) => {
  const userId = req.userData.id;
  const orderId = req.params.id;
  try {
    const [orderCheck] = await orderService.orderCheckService(userId, orderId);
    if (!orderCheck) {
      res.status(400).json({ message: "invalid orderId" });
      return;
    }
    await orderService.paymentService(userId, orderId);
    res.status(200).json({ message: "completed Payment" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const orderCancelController = async (req, res) => {
  const userId = req.userData.id;
  const orderId = req.body.id;

  try {
    await orderService.orderCancelService(userId, orderId);
    res.status(200).json({ message: "cancel completed" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};

module.exports = {
  orderController,
  paymentController,
  orderCancelController,
};
