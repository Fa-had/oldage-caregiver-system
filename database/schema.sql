
CREATE DATABASE IF NOT EXISTS elderly_care;
USE elderly_care;


CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  passwordHash VARCHAR(255) NOT NULL,
  role ENUM('admin','resident','resident_care','cook','visitor') NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS residents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  resident_code VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  age INT,
  gender ENUM('male','female'),
  joining_date DATE,
  caregiver_id INT NULL,
  status ENUM('Active','Inactive') DEFAULT 'Active',
  room_id INT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL,
  FOREIGN KEY (caregiver_id) REFERENCES staff(id) ON DELETE SET NULL
);




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


CREATE TABLE IF NOT EXISTS meals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  residentId INT NOT NULL,
  requestedByStaffId INT NOT NULL, 
  date DATE NOT NULL,
  type ENUM('breakfast','lunch','dinner') NOT NULL,
  quantity INT DEFAULT 1,
  spicy BOOLEAN DEFAULT FALSE,
  sugarFree BOOLEAN DEFAULT FALSE,
  saltFree BOOLEAN DEFAULT FALSE,
  notes TEXT,
  status ENUM('pending','prepared','delivered') DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (residentId) REFERENCES residents(id) ON DELETE CASCADE,
  FOREIGN KEY (requestedByStaffId) REFERENCES staff(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS medical_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  residentId INT NOT NULL,
  staffId INT NOT NULL, esident_care)
  date DATE NOT NULL,
  temperature DECIMAL(5,2),
  bloodPressure VARCHAR(20),
  heartRate INT,
  oxygenLevel INT,
  condition ENUM('normal','slightly_elevated','critical') DEFAULT 'normal',
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (residentId) REFERENCES residents(id) ON DELETE CASCADE,
  FOREIGN KEY (staffId) REFERENCES staff(id) ON DELETE SET NULL
);



CREATE TABLE IF NOT EXISTS staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  role ENUM('admin','resident_care','cook') NOT NULL,
  work_hours VARCHAR(50),
  contact VARCHAR(50),
  email VARCHAR(100),
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS notices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('info','warning','urgent') NOT NULL,
  message TEXT NOT NULL,
  created_by INT NOT NULL,
  sender_name VARCHAR(100),
  sender_role ENUM('admin','resident_care','cook') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES staff(id) ON DELETE CASCADE
);


CREATE TABLE donations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    donorName VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    type ENUM('cash', 'goods', 'service') DEFAULT 'cash',
    notes TEXT,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

le
CREATE TABLE finance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('income', 'expense') NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  payment_method ENUM('cash', 'card', 'bank') NOT NULL,
  date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  resident_id INT NULL,                          
  form_filled_by ENUM('elderly', 'guardian', 'admin') NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  nid VARCHAR(20),
  age INT CHECK (age > 0),
  gender ENUM('male', 'female'),
  contact VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  image_path VARCHAR(255),
  medical_conditions JSON,
  symptoms JSON,
  taking_medication ENUM('yes', 'no', 'unsure'),
  medication_details TEXT,
  medication_allergies ENUM('yes', 'no', 'unsure'),
  allergy_details TEXT,
  illegal_drug_use ENUM('yes', 'no'),
  alcohol_frequency ENUM('daily', 'weekly', 'monthly', 'occasionally', 'never'),
  guardian_name VARCHAR(100),
  guardian_nid VARCHAR(20),
  guardian_contact VARCHAR(20),
  guardian_email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (resident_id) REFERENCES residents(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_number VARCHAR(10) UNIQUE NOT NULL,
  capacity INT DEFAULT 4,
  occupied INT DEFAULT 0,
  status ENUM('Available','Full','Inactive') DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

