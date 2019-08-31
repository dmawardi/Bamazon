-- Drop the Bamazon db and start fresh if detected
DROP DATABASE IF EXISTS BamazonDB;

CREATE DATABASE BamazonDB;

USE BamazonDB;

-- Create products table
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(11,2) NOT NULL,
  stock_quantity INTEGER NULL,
  PRIMARY KEY (item_id)
);

-- Insert mock products 
INSERT INTO BamazonDB.products (product_name, department_name, price, stock_quantity)
VALUES ('Gustavo', 'Toys', '12.00', 2),
('Black Sweater', 'Clothing', '32.00', 2),
('Sony Handycam', 'Cameras', '450.00', 2),
('iPhone XS', 'Phones', '1500.00', 2),
('Galaxy Note 6', 'Phones', '1400.00', 2),
('Macbook Pro', 'PC / Laptops', '2950.00', 2),
('Shaver', 'Amenities', '12.00', 2),
('Rug', 'Homeware', '120.00', 2),
('Ferrero Rocher Chocolates', 'Sweets', '4.60', 2),
('PS4', 'Entertainment / Gaming', '12.00', 2);
