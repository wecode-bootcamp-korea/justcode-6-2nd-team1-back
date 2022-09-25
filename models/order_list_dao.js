const { myDataSource } = require("./common");

const getOrderListByUserId = async (userId) => {
  return await myDataSource.query(
    `SELECT 
    orders.id as orderId,
    beverages.beverage_name,
    beverages.beverage_image,
    orders.amount,
    orders.total_price,
    orders.order_status_id,
    orders.cold, 
    orders.sugar, 
    orders.ice,
      json_arrayagg(
          json_object(
          "topping_id",topping_id,
          "amount",topping_order.amount)) as toppings
          FROM orders
          JOIN beverages ON orders.beverage_id = beverages.id
          RIGHT JOIN topping_order ON orders.id = topping_order.order_id
          WHERE user_id = ? AND order_status_id > 2
          GROUP BY orders.id;
    `,
    [userId]
  );
};

module.exports = { getOrderListByUserId };
