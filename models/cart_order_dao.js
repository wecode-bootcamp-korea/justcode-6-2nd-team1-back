const { myDataSource } = require("./common");

const modifyCartOrderStatusByUserId = async (userId) => {
  await myDataSource.query(
    `UPDATE orders SET order_status_id = 2 WHERE user_id = ?;
    `,
    [userId]
  );
};

const getCartUserDataByUserId = async (userId) => {
  return await myDataSource.query(
    `SELECT 
        users.name as userName, users.phone_number, shops.name as shopName,
        shops.address,orders.take_out,
        users.point
      FROM orders
      JOIN users ON orders.user_id = users.id
      JOIN shops ON users.shop_location_id = shops.id
      WHERE orders.user_id=? limit 1;
    `,
    [userId]
  );
};

const getBeverageDataByUserId = async (userId) => {
  return await myDataSource.query(
    `SELECT 
    orders.id as orderId,
    beverages.beverage_name,
    beverages.beverage_image,
    beverages.price,
    orders.amount,
    orders.cold, 
    orders.sugar, 
    orders.ice,
      json_arrayagg(
          json_object(
          "topping_id",topping_id,
          "amount",topping_order.amount)) as toppingData
          FROM orders
          JOIN beverages ON orders.beverage_id = beverages.id
          RIGHT JOIN topping_order ON orders.id = topping_order.order_id
          WHERE user_id = ? AND order_status_id = 2
          GROUP BY orders.id;
    `,
    [userId]
  );
};

const getTotalPriceByUserId = async (userId) => {
  return await myDataSource.query(
    `SELECT SUM(total_price) as totalPrice 
      FROM orders 
      WHERE user_id = ? AND order_status_id = 2;
    `,
    [userId]
  );
};

const getTotalPrice = async (userId, orderId) => {
  return await myDataSource.query(
    `SELECT SUM(total_price) as totalPrice
      FROM orders
      WHERE user_id = ? AND order_status_id = 2
    `,
    [userId]
  );
};

const modifyCartOrderUserPoint = async (userId, totalPrice) => {
  const [point] = await myDataSource.query(
    `
    SELECT point - ? as result 
    FROM users 
    WHERE id = ?
    `,
    [totalPrice, userId]
  );

  await myDataSource.query(
    `UPDATE users SET point = ? WHERE id = ?
    `,
    [point.result, userId]
  );
};

module.exports = {
  modifyCartOrderStatusByUserId,
  getCartUserDataByUserId,
  getBeverageDataByUserId,
  getTotalPriceByUserId,
  getTotalPrice,
  modifyCartOrderUserPoint,
};
