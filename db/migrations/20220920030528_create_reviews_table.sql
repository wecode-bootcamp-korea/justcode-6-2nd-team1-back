-- migrate:up
CREATE TABLE reviews(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_id INT NOT NULL,
  content VARCHAR(50) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT now(),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (order_id) REFERENCES orders (id)
);

-- migrate:down

DROP TABLE reviews;