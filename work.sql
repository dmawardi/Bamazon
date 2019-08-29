-- challenge 1 part 8
UPDATE bamazon.products 
SET stock_quantity = VAR()
WHERE item_id = var();


-- challenge 2 part 'view low inventory'
SELECT * 
FROM bamazon.products
WHERE stock_quantity < 5

--challenge 2 part 'Add to inventory'
UPDATE bamazon.products 
SET stock_quantity = VAR()
WHERE item_id = var();


-- challenge 2 part 'add new product'
INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity)
(var, var, var, var);

--Challenge 3 supervisor view
CREATE TABLE departments(
department_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(25),
over_head_costs DECIMAL(11,2),
stock_quantity INTEGER);

-- changed products table
CREATE TABLE products(
item_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(25),
department_name VARCHAR(25),
price DECIMAL(11,2),
stock_quantity INTEGER,
product_sales DECIMAL(11,2));

-- Potential package: NPM i tables
