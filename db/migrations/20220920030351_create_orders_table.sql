-- migrate:up
CREATE TABLE orders(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  beverage_id INT NOT NULL,
  amount INT,
  sugar INT,
  ice VARCHAR(30),
  order_status TINYINT,
  take_out TINYINT,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (beverage_id) REFERENCES beverages (id)
);

-- migrate:down

DROP TABLE orders;