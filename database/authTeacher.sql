-- Use the database
CREATE DATABASE IF NOT EXISTS project_root_ems;
USE project_root_ems;

-- Create Teacher table
CREATE TABLE IF NOT EXISTS teacher_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    subject VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample Teacher users
INSERT INTO teacher_user (username, password, email, subject)
VALUES
('TEA00001', 'password123', 'tea1@example.com', 'Math'),
('TEA00002', 'password123', 'tea2@example.com', 'English');
