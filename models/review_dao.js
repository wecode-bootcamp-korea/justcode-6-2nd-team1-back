const { myDataSource } = require("./common");

const createReview = async (userId, beverageId, content, score) => {
  const [checkPay] = await myDataSource.query(
    `SELECT order_status_id
      FROM orders
      JOIN users ON users.id = orders.user_id
      JOIN beverages ON beverages.id = orders.beverage_id
      WHERE users.id = ? AND beverages.id = ? AND order_status_id = 3 AND
      (orders.created_at BETWEEN DATE_ADD(NOW(),INTERVAL -1 WEEK) AND now());
    `,
    [userId, beverageId]
  );
  if (!checkPay) {
    const err = new Error("Not paid yet");
    err.statusCode = 400;
    throw err;
  } else {
    await myDataSource.query(
      `INSERT INTO reviews (user_id,beverage_id,content,score) 
      VALUES (?,?,?,?)
    `,
      [userId, beverageId, content, score]
    );
  }
};

const getReview = async (beverageId) => {
  return await myDataSource.query(
    `SELECT reviews.id,users.nickname,content,score,reviews.created_at FROM reviews 
      JOIN users ON users.id = reviews.user_id
      WHERE beverage_id = ?
      ORDER BY reviews.created_at desc;
    `,
    [beverageId]
  );
};

const deleteReview = async (userId, reviewId) => {
  const [userCheck] = await myDataSource.query(
    `SELECT user_id 
      FROM reviews 
      WHERE reviews.id = ?;
    `,
    [reviewId]
  );

  if (!userCheck) {
    const err = new Error("not exist review");
    err.statusCode = 400;
    throw err;
  }

  if (userCheck.user_id !== userId) {
    const err = new Error("Unauthorized users");
    err.statusCode = 400;
    throw err;
  }

  await myDataSource.query(
    `DELETE FROM reviews WHERE id = ?;
    `,
    [reviewId]
  );
};

module.exports = { createReview, getReview, deleteReview };
