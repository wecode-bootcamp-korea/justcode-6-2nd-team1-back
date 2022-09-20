-- migrate:up
CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  name VARCHAR(10) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  point INT,
  user_location VARCHAR(100),
  shop_location_id INT,
  refresh_token VARCHAR(100) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  FOREIGN KEY (shop_location_id) REFERENCES shops (id)
  );

-- migrate:down
DROP TABLE users;