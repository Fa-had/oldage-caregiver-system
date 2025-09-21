-- Create the database
CREATE DATABASE IF NOT EXISTS elderly_care;
USE elderly_care;

-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'resident', 'staff', 'cook', 'visitor') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create residents table
CREATE TABLE residents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    age INT NOT NULL,
    roomNo VARCHAR(10) NOT NULL,
    medicalNotes TEXT,
    contactPerson VARCHAR(255) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create appointments table
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    visitorName VARCHAR(255) NOT NULL,
    residentId INT,
    purpose TEXT NOT NULL,
    datetime DATETIME NOT NULL,
    status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (residentId) REFERENCES residents(id) ON DELETE SET NULL
);

-- Create meals table
CREATE TABLE meals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    residentId INT NOT NULL,
    date DATE NOT NULL,
    type ENUM('breakfast', 'lunch', 'dinner') NOT NULL,
    spicy BOOLEAN DEFAULT false,
    sugarFree BOOLEAN DEFAULT false,
    saltFree BOOLEAN DEFAULT false,
    notes TEXT,
    status ENUM('pending', 'prepared', 'delivered') DEFAULT 'pending',
    FOREIGN KEY (residentId) REFERENCES residents(id) ON DELETE CASCADE
);

-- Create staff table
CREATE TABLE staff (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    assignedResidentId INT,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assignedResidentId) REFERENCES residents(id) ON DELETE SET NULL
);

-- Create notices table
CREATE TABLE notices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    publishDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create donations table
CREATE TABLE donations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    donorName VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create finance table
CREATE TABLE finance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('income', 'expense') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    source VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);