-- migrate:up
CREATE TABLE toppings(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price DECIMAL NOT NULL
);

-- migrate:down

DROP TABLE toppings;