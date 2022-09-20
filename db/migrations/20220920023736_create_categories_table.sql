-- migrate:up
CREATE TABLE categories(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category_code VARCHAR(30) NOT NULL,
  category_name VARCHAR(50) NOT NULL
);

-- migrate:down

DROP TABLE categories;