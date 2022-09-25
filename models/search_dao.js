const { myDataSource } = require("./common");

const getBeverageData = async (keyword) => {
  return await myDataSource.query(
    `SELECT beverages.id,category_name,
            beverages.beverage_name,beverages.beverage_image,
            beverages.price,beverages.description 
            FROM beverages
    JOIN categories ON categories.id = beverages.category_id
    WHERE beverage_name LIKE CONCAT ("%",?,"%") 
    OR description LIKE CONCAT("%",?,"%")
    OR categories.category_name LIKE CONCAT ("%",?,"%");
    `,
    [keyword, keyword, keyword]
  );
};

module.exports = { getBeverageData };
