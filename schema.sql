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
