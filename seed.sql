USE BamazonDB;
INSERT INTO products (product_name, department_name, price, stock_quantity)
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

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Toys', 12000.00),
('Clothing', 32000),
('Cameras', 45000),
('Phones', 15000),
('PC / Laptops', 29500),
('Amenities', 12650),
('Homeware', 2400),
('Sweets', 400.60),
('Entertainment / Gaming', 32543.99);