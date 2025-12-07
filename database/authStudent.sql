-- Use the database
CREATE DATABASE IF NOT EXISTS project_root_ems;
USE project_root_ems;

-- Create Student table
CREATE TABLE IF NOT EXISTS student_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    roll_no VARCHAR(20),
    class VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample Student users
INSERT INTO student_user (username, password, email, roll_no, class)
VALUES
('STD00001', 'password123', 'std1@example.com', 'R001', 'Class 1'),
('STD00002', 'password123', 'std2@example.com', 'R002', 'Class 2');
