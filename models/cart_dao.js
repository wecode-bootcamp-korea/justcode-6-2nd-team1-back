const { myDataSource } = require("./common");

const createCart = async (
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
       VALUES (?,?,1,?,?,?,?,?,?);
      `,
    [userId, beverageId, amount, sugar, ice, takeOut, cold, totalPrice]
  );
};

const createCartNullToppings = async (userId, beverageId) => {
  const [orderId] = await myDataSource.query(
    `SELECT id from orders WHERE user_id = ? AND beverage_id = ? AND order_status_id = 1
     ORDER BY id desc limit 1;
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
};

const createCartToppings = async (userId, beverageId, toppings) => {
  const [orderId] = await myDataSource.query(
    `SELECT id from orders WHERE user_id = ? AND beverage_id = ? AND order_status_id = 1
     ORDER BY id desc limit 1;
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
};

const getCartDataByUserId = async (userId) => {
  return await myDataSource.query(
    `SELECT 
      shops.name as shopName, orders.id as orderId,
      beverages.beverage_image,
      beverages.beverage_name,
      beverages.price,orders.amount as orderAmount,
      orders.cold,orders.sugar,orders.ice,
      json_arrayagg(
        json_object(
          "topping_id",topping_id,"amount",topping_order.amount
          )
        ) as toppingData
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN shops ON users.shop_location_id = shops.id
    JOIN beverages ON orders.beverage_id = beverages.id
    JOIN topping_order ON orders.id = topping_order.order_id
     WHERE orders.user_id = ? AND orders.order_status_id = 1
     GROUP by order_id;
    `,
    [userId]
  );
};

const modifyCart = async (userId, orderId, amount, totalPrice) => {
  await myDataSource.query(
    `UPDATE orders SET amount = ?, total_price = ? WHERE id = ? AND user_id = ?;
    `,
    [amount, totalPrice, orderId, userId]
  );
};

const deleteCart = async (userId, orderId) => {
  await myDataSource.query(
    `DELETE FROM orders 
    WHERE orders.id = ? AND user_id = ? AND order_status_id = 1;
    `,
    [orderId, userId]
  );
};

module.exports = {
  createCart,
  createCartToppings,
  getCartDataByUserId,
  modifyCart,
  deleteCart,
  createCartNullToppings,
};
