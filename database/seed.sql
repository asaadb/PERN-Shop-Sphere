-- Insert categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Clothing', 'Apparel and fashion items'),
('Books', 'Books and publications');

-- Insert products
INSERT INTO products (name, description, price, category_id, stock_quantity, image_url) VALUES
('iPhone 15 Pro', 'Latest Apple smartphone with A17 chip', 999.99, 1, 50, '/images/iphone15.jpg'),
('Samsung Galaxy S24', 'Flagship Android phone', 899.99, 1, 30, '/images/galaxy-s24.jpg'),
('Cotton T-Shirt', 'Comfortable cotton t-shirt', 19.99, 2, 100, '/images/tshirt.jpg'),
('JavaScript Book', 'Learn JavaScript programming', 39.99, 3, 25, '/images/js-book.jpg');