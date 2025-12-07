-- Use the database
CREATE DATABASE IF NOT EXISTS project_root_ems;
USE project_root_ems;

-- Create Admin table
CREATE TABLE IF NOT EXISTS admin_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample Admin users
INSERT INTO admin_user (username, password, email)
VALUES
('hossain', 'password123', 'hossain@example.com'),
('ayon', 'password123', 'ayon@example.com');
