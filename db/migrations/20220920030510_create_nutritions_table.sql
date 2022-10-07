-- migrate:up
CREATE TABLE nutritions(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  beverage_id INT NOT NULL,
  kcal INT NOT NULL,
  sugar INT NOT NULL,
  protein INT NOT NULL,
  fat INT NOT NULL,
  sodium INT NOT NULL,
  caffein INT NOT NULL,
  FOREIGN KEY (beverage_id) REFERENCES beverages (id)
);

-- migrate:down

DROP TABLE nutritions;