-- migrate:up
CREATE TABLE shops(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  location VARCHAR(100) NOT NULL,
  address VARCHAR(200) NOT NULL
);

-- migrate:down

DROP TABLE shops;