-- Insert categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Clothing', ' fashion items'),
('Books', 'Books and publications');

-- Insert products
INSERT INTO products (name, description, price, category_id, stock_quantity, image_url) VALUES
('iPhone 15 Pro', 'Latest Apple smartphone', 999.99, 1, 50, 'https://plus.unsplash.com/premium_photo-1668612078695-48b09fd23398?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Samsung Galaxy S24', 'Flagship Android phone', 899.89, 1, 30, 'https://plus.unsplash.com/premium_photo-1668612078695-48b09fd23398?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Cotton T-Shirt', 'Comfortable cotton t-shirt', 19.9, 2, 100, 'https://plus.unsplash.com/premium_photo-1668612078695-48b09fd23398?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('JavaScript Book', 'learn JavaScript programming', 100, 3, 25, 'https://plus.unsplash.com/premium_photo-1668612078695-48b09fd23398?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');