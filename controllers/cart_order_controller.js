const cartOrderService = require("../services/cart_order_service");

const cartOrderController = async (req, res) => {
  const userId = req.userData.id;
  const orderId = req.body;
  try {
    const orderData = await cartOrderService.cartOrderService(userId, orderId);
    res.status(200).json({ orderData });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

const cartOrderPaymentController = async (req, res) => {
  const userId = req.userData.id;
  const orderId = req.body;
  try {
    await cartOrderService.cartOrderPaymentService(userId, orderId);
    res.status(200).json({ message: "completed payment" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { cartOrderController, cartOrderPaymentController };
