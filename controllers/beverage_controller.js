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
module.exports = {
  detailController,
  categoryDetailcontroller,
  OrderController,
  paymentController,
};
