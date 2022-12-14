const { myDataSource } = require("./common");

const createOrder = async (
  userId,
  beverageId,
  amount,
  cold,
  totalPrice,
  takeOut,
  sugar,
  ice
) => {
  await myDataSource.query(
    `INSERT INTO orders
      (user_id,beverage_id,order_status_id,amount,sugar,ice,take_out,cold,total_price)
     VALUES (?,?,2,?,?,?,?,?,?);
    `,
    [userId, beverageId, amount, sugar, ice, takeOut, cold, totalPrice]
  );
};

const createToppingsNull = async (userId, beverageId) => {
  const [orderId] = await myDataSource.query(
    `SELECT id from orders WHERE user_id = ? AND beverage_id = ? AND order_status_id = 2
    ORDER BY orders.id desc limit 1;
    `,
    [userId, beverageId]
  );
  await myDataSource.query(
    `INSERT INTO 
      topping_order (order_id) 
     VALUES (?)
    `,
    [orderId.id]
  );

  setTimeout(async () => {
    const [statusId] = await myDataSource.query(
      `SELECT id,order_status_id as statusId from orders WHERE user_id = ? AND beverage_id = ? AND order_status_id = 2;
      `,
      [userId, beverageId]
    );
    if (!statusId) {
      return;
    } else if (statusId.statusId === 2) {
      myDataSource.query(
        `DELETE FROM orders WHERE id = ?
            `,
        [statusId.id]
      );
    }
  }, 60000);
};

const createToppings = async (userId, beverageId, toppings) => {
  const [orderId] = await myDataSource.query(
    `SELECT id from orders WHERE user_id = ? AND beverage_id = ? AND order_status_id = 2
     ORDER BY orders.id desc limit 1;
    `,
    [userId, beverageId]
  );
  await myDataSource.query(
    `INSERT INTO 
      topping_order (order_id,topping_id,amount) 
     VALUES (?,?,?)
    `,
    [orderId.id, toppings.id, toppings.amount]
  );

  setTimeout(async () => {
    const [statusId] = await myDataSource.query(
      `SELECT id,order_status_id as statusId from orders WHERE user_id = ? AND beverage_id = ? AND order_status_id = 2;
      `,
      [userId, beverageId]
    );
    if (!statusId) {
      return;
    } else if (statusId.statusId === 2) {
      myDataSource.query(
        `DELETE FROM orders WHERE id = ?
            `,
        [statusId.id]
      );
    }
  }, 60000);
};

const getOrderData = async (userId, beverageId) => {
  const [orderId] = await myDataSource.query(
    `SELECT id from orders WHERE user_id = ? AND beverage_id = ? AND order_status_id = 2
     ORDER BY orders.id desc limit 1;
    `,
    [userId, beverageId]
  );

  const orderData = await myDataSource.query(
    `SELECT 
      orders.id as orderId, users.name as userName, users.phone_number, shops.name as shopName,
      shops.address,orders.take_out,
      users.point,beverages.beverage_name,
      beverages.beverage_image,
      beverages.price,orders.amount,orders.cold, 
      orders.sugar,
      orders.ice ,
        (SELECT 
          json_arrayagg(json_object("topping_id",topping_id,"amount",topping_order.amount))
        FROM topping_order
        JOIN orders ON orders.id = topping_order.order_id
        WHERE orders.id = ?) as toppingData,
        orders.total_price
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN beverages ON orders.beverage_id = beverages.id
    JOIN shops ON users.shop_location_id = shops.id
    WHERE orders.user_id=? AND orders.beverage_id =? AND orders.order_status_id = 2
    ORDER BY orders.id desc limit 1;
    `,
    [orderId.id, userId, beverageId]
  );
  return orderData;
};

const getOrderCheck = async (userId, orderId) => {
  const orderCheck = await myDataSource.query(
    `SELECT id FROM orders WHERE orders.user_id = ? AND orders.id = ?;
    `,
    [userId, orderId]
  );
  return orderCheck;
};

const modifyUserPoint = async (userId, orderId) => {
  const [totalPrice] = await myDataSource.query(
    `SELECT total_price as price 
        FROM orders 
        WHERE orders.id = ?
    `,
    [orderId]
  );

  const [userPoint] = await myDataSource.query(
    `SELECT point FROM users WHERE id = ?
    `,
    [userId]
  );
  const [point] = await myDataSource.query(
    `SELECT point - ? as result 
     FROM users 
     WHERE id = ?
    `,
    [totalPrice.price, userId]
  );
  point.result = Number(point.result);
  if (totalPrice.price > userPoint.point) {
    await myDataSource.query(
      `DELETE FROM orders WHERE orders.id = ?;
      `,
      [orderId]
    );

    const err = new Error("point is not enough");
    err.statusCode = 400;
    throw err;
  }
  await myDataSource.query(
    `UPDATE users SET point = ? WHERE id = ?
    `,
    [point.result, userId]
  );
};

const modifyOrderStatus = async (orderId) => {
  await myDataSource.query(
    `UPDATE orders SET order_status_id = 3 WHERE id = ?
    `,
    [orderId]
  );
};

const modifyCancelOrder = async (userId, orderId) => {
  const [refundPoint] = await myDataSource.query(
    `SELECT total_price FROM orders 
     WHERE user_id = ? 
     AND orders.id = ?;
    `,
    [userId, orderId]
  );

  const [resultPoint] = await myDataSource.query(
    `SELECT point + ? as result FROM users WHERE users.id = ?;
    `,
    [refundPoint.total_price, userId]
  );

  await myDataSource.query(
    `UPDATE users 
     SET point = ? WHERE id = ?;
    `,
    [resultPoint.result, userId]
  );

  await myDataSource.query(
    `UPDATE orders 
     SET orders.order_status_id = 4 
     WHERE orders.id = ?
    `,
    [orderId]
  );
};

module.exports = {
  createOrder,
  createToppings,
  createToppingsNull,
  getOrderData,
  modifyOrderStatus,
  getOrderCheck,
  modifyUserPoint,
  modifyCancelOrder,
};
