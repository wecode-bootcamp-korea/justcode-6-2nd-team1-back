const { myDataSource } = require("./common");

const modifyCartOrderStatusByOrderId = async (orderId) => {
  await myDataSource.query(
    `UPDATE orders SET order_status_id = 2 WHERE id = ?;
    `,
    [orderId]
  );
};

const getCartUserDataByUserId = async (userId) => {
  return await myDataSource.query(
    `SELECT 
        users.name as userName, users.phone_number, shops.name as shopName,
        shops.address,users.point
      FROM users
      JOIN shops ON users.shop_location_id = shops.id
      WHERE users.id = ? limit 1;
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

const getCartTotalPrice = async (userId) => {
  return await myDataSource.query(
    `SELECT SUM(total_price) as totalPrice
      FROM orders
      WHERE user_id = ? AND order_status_id = 2
    `,
    [userId]
  );
};

const modifyCartOrderUserPoint = async (userId, orderId) => {
  const [totalPrice] = await myDataSource.query(
    `SELECT SUM(total_price) as totalPrice
      FROM orders
      WHERE user_id = ? AND order_status_id = 2
    `,
    [userId]
  );

  const [userPoint] = await myDataSource.query(
    `SELECT point FROM users WHERE id = ?
    `,
    [userId]
  );
  if (userPoint.point < totalPrice.totalPrice) {
    for (let i in orderId)
      await myDataSource.query(
        `DELETE FROM orders WHERE orders.id = ?;
        `,
        [orderId[i].id]
      );

    const err = new Error("point not enough");
    err.statusCode = 400;
    throw err;
  }

  const [point] = await myDataSource.query(
    `
    SELECT point - ? as result 
    FROM users 
    WHERE id = ?
    `,
    [totalPrice.totalPrice, userId]
  );

  await myDataSource.query(
    `UPDATE users SET point = ? WHERE id = ?
    `,
    [point.result, userId]
  );
};

module.exports = {
  modifyCartOrderStatusByOrderId,
  getCartUserDataByUserId,
  getBeverageDataByUserId,
  getCartTotalPrice,
  modifyCartOrderUserPoint,
};
