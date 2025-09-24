-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default admin user (change password in production)
INSERT INTO admin_users (email, password, name) 
VALUES ('admin@lorenastore.com', 'admin123', 'Admin User');

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true);

-- Set up RLS policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Public can view products" ON products
    FOR SELECT USING (true);

-- Allow authenticated admin to manage products
CREATE POLICY "Admin can manage products" ON products
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Allow admin login
CREATE POLICY "Admin can view own data" ON admin_users
    FOR SELECT USING (true);