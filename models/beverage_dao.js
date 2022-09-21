const { myDataSource } = require("./common");

const getDetailDataById = async (beverageId) => {
  const detailData = await myDataSource.query(
    ` 
    SELECT b.id, b.beverage_name as beverageName, b.beverage_image as imageURL, b.price, b.description,
      JSON_OBJECT("kcal",n.kcal,"sugar",n.sugar,"protein",n.protein,"fat",n.fat,"sodium",n.sodium,"caffein",n.caffein) as nutrition_data,
        (SELECT 
          JSON_ARRAYAGG(
          JSON_OBJECT(
           "id",reviews.id, "content",reviews.content, "createdAt",reviews.created_at,
           "nickname",users.nickname)) 
        FROM reviews 
        JOIN users ON users.id = reviews.user_id
        WHERE beverage_id = ?) AS review_data
     FROM beverages b
    JOIN nutritions n ON n.beverage_id = b.id
    WHERE b.id = ?;
    `,
    [beverageId, beverageId]
  );
  return detailData;
};

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

const createToppings = async (userId, beverageId, toppings) => {
  const [orderId] = await myDataSource.query(
    `SELECT id from orders WHERE user_id = ? AND beverage_id = ? AND order_status_id = 2;
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

const getOrderData = async (userId, beverageId) => {
  const orderData = await myDataSource.query(
    `SELECT 
      orders.id as orderId,users.name, users.phone_number, shops.name,
      shops.address,orders.take_out,
      users.point,beverages.beverage_name,
      beverages.beverage_image,
      beverages.price,orders.amount,orders.cold, 
      orders.sugar, 
      orders.ice ,
        (SELECT 
          json_arrayagg(json_object("topping_id",topping_id,"amount",topping_order.amount))
        FROM topping_order
        JOIN orders ON orders.user_id = ? AND orders.beverage_id = ?
        WHERE orders.id = topping_order.order_id) as toppingData,
        orders.total_price
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN beverages ON orders.beverage_id = beverages.id
    JOIN shops ON users.shop_location_id = shops.id
    WHERE orders.user_id=? AND orders.beverage_id =? AND orders.order_status_id = 2;
    `,
    [userId, beverageId, userId, beverageId]
  );
  return orderData;
};

const getBeverageDataById = async (categoryId) => {
  const beverageData = await myDataSource.query(
    `SELECT id, beverage_name, beverage_image, price 
      FROM beverages 
      WHERE category_id = ?;
    `,
    [categoryId]
  );
  return beverageData;
};

const ModifyOrderStatus = async (orderId) => {
  await myDataSource.query(
    `UPDATE orders SET order_status_id = 3 WHERE id = ?
    `,
    [orderId]
  );
};

const ModifyUserPoint = async (userId, orderId) => {
  const [totalPrice] = await myDataSource.query(
    `SELECT total_price as price 
        FROM orders 
        WHERE orders.id = ?
    `,
    [orderId]
  );

  const [point] = await myDataSource.query(
    `SELECT point - ? as result 
        FROM users 
        WHERE id = ?
    `,
    [totalPrice.price, userId]
  );

  await myDataSource.query(
    `UPDATE users SET point = ? WHERE id = ?
    `,
    [point.result, userId]
  );
};
module.exports = {
  getDetailDataById,
  getBeverageDataById,
  createOrder,
  createToppings,
  getOrderData,
  ModifyOrderStatus,
  ModifyUserPoint,
};
