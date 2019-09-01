-- Drop the Bamazon db and start fresh if detected
DROP DATABASE IF EXISTS BamazonDB;

CREATE DATABASE BamazonDB;

USE BamazonDB;

-- Create products table
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(11,2) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  product_sales DECIMAL(11,2) DEFAULT 0,
  PRIMARY KEY (item_id)
);

-- Create departments table
CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs DECIMAL(11,2) NOT NULL,
  PRIMARY KEY (department_id)
);

-- Insert mock products 
INSERT INTO BamazonDB.products (product_name, department_name, price, stock_quantity)
VALUES ('Gustavo', 'Toys', 12.00, 12),
('Black Sweater', 'Clothing', 32, 32),
('Sony Handycam', 'Cameras', 450, 28),
('iPhone XS', 'Phones', 1500, 24),
('Galaxy Note 6', 'Phones', 1400, 25),
('Macbook Pro', 'PC / Laptops', 2950, 27),
('Shaver', 'Amenities', 12, 26),
('Rug', 'Homeware', 120, 24),
('Ferrero Rocher Chocolates', 'Sweets', 4.6, 28),
('PS4', 'Entertainment / Gaming', 240.99, 24);

INSERT INTO BamazonDB.departments (department_name, over_head_costs)
VALUES ('Toys', 12000.00),
('Clothing', 32000),
('Cameras', 45000),
('Phones', 15000),
('PC / Laptops', 29500),
('Amenities', 12650),
('Homeware', 2400),
('Sweets', 400.60),
('Entertainment / Gaming', 32543.99);
