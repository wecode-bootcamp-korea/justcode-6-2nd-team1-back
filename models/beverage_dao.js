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

module.exports = { getDetailDataById };
