-- migrate:up
CREATE TABLE topping_order(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  topping_id INT NOT NULL,
  amount INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders (id),
  FOREIGN KEY (topping_id) REFERENCES toppings (id)
);

-- migrate:down
DROP TABLE topping_order;