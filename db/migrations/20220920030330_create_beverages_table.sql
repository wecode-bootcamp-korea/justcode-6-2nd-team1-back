-- migrate:up
CREATE TABLE beverages(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
beverage_name VARCHAR(30) NOT NULL,
beverage_image VARCHAR(200) NOT NULL,
price DECIMAL NOT NULL,
cold TINYINT NOT NULL DEFAULT 1,
description VARCHAR(1000),
category_id INT NOT NULL,
FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- migrate:down

DROP TABLE beverages;