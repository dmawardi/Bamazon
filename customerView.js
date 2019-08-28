'DROP DATABASE IF EXISTS bamazon;'

'CREATE DATABASE bamazon;'

'CREATE TABLE products;'

'item_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY'+ 'product_name VARCHAR(40) NOT NULL' +
'department_name VARCHAR(25)' +
'price FLOAT ' +
'stock_quantity INTEGER;'

'INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity)' +
"('Gustavo', 'Toys', '12.00', 2)," +
"('Black Sweater', 'Clothing', '32.00', 2)," +
"('Sony Handycam', 'Cameras', '450.00', 2)," +
"('iPhone XS', 'Phones', '1500.00', 2)," +
"('Galaxy Note 6', 'Phones', '1400.00', 2)," +
"('Macbook Pro', 'PC / Laptops', '2950.00', 2)," +
"('Shaver', 'Amenities', '12.00', 2)," +
"('Rug', 'Homeware', '120.00', 2)," +
"('Ferrero Rocher Chocolates', 'Sweets', '4.60', 2)," +
"('PS4', 'Entertainment / Gaming', '12.00', 2);"
