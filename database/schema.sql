-- Create the database and switch to it
CREATE DATABASE IF NOT EXISTS elderly_care CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE elderly_care;

-- Rooms (referenced by residents)
CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_number VARCHAR(10) UNIQUE NOT NULL,
  capacity INT UNSIGNED DEFAULT 4,
  occupied INT UNSIGNED DEFAULT 0,
  status ENUM('available','full','inactive') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (occupied <= capacity)
) ENGINE=InnoDB;

-- Staff (referenced by residents, meals, medical_records, notices)
CREATE TABLE IF NOT EXISTS staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  role ENUM('admin','resident_care','cook') NOT NULL,
  work_hours VARCHAR(50),
  contact VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Residents (references rooms and staff)
CREATE TABLE IF NOT EXISTS residents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  resident_code VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  age INT UNSIGNED,
  gender ENUM('male','female','other'),
  joining_date DATE,
  caregiver_id INT NULL,
  status ENUM('active','inactive') DEFAULT 'active',
  room_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL,
  FOREIGN KEY (caregiver_id) REFERENCES staff(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Users (link optionally to staff or resident)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','resident','resident_care','cook','visitor') NOT NULL,
  staff_id INT NULL,
  resident_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE SET NULL,
  FOREIGN KEY (resident_id) REFERENCES residents(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  visitor_name VARCHAR(255) NOT NULL,
  visitor_contact VARCHAR(50),
  resident_id INT NULL,
  purpose TEXT NOT NULL,
  appointment_time DATETIME NOT NULL,
  status ENUM('pending','approved','rejected','completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resident_id) REFERENCES residents(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Meals
CREATE TABLE IF NOT EXISTS meals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  resident_id INT NOT NULL,
  requested_by_staff_id INT NULL,
  date DATE NOT NULL,
  type ENUM('breakfast','lunch','dinner') NOT NULL,
  quantity INT UNSIGNED DEFAULT 1,
  spicy BOOLEAN DEFAULT FALSE,
  sugar_free BOOLEAN DEFAULT FALSE,
  salt_free BOOLEAN DEFAULT FALSE,
  notes TEXT,
  status ENUM('pending','prepared','delivered') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resident_id) REFERENCES residents(id) ON DELETE CASCADE,
  FOREIGN KEY (requested_by_staff_id) REFERENCES staff(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Medical records
CREATE TABLE IF NOT EXISTS medical_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  resident_id INT NOT NULL,
  staff_id INT NULL,
  date DATE NOT NULL,
  temperature DECIMAL(4,1),
  blood_pressure_systolic SMALLINT UNSIGNED,
  blood_pressure_diastolic SMALLINT UNSIGNED,
  heart_rate SMALLINT UNSIGNED,
  oxygen_level TINYINT UNSIGNED,
  `condition` ENUM('normal','slightly_elevated','critical') DEFAULT 'normal',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resident_id) REFERENCES residents(id) ON DELETE CASCADE,
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Notices
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
) ENGINE=InnoDB;

-- Donations
CREATE TABLE IF NOT EXISTS donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor_name VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type ENUM('cash','goods','service') DEFAULT 'cash',
  notes TEXT,
  status ENUM('pending','completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Finance
CREATE TABLE IF NOT EXISTS finance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('income','expense') NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  payment_method ENUM('cash','card','bank') NOT NULL,
  date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Admissions
CREATE TABLE IF NOT EXISTS admissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  resident_id INT NULL,
  form_filled_by ENUM('elderly','guardian','admin') NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  nid VARCHAR(20),
  age INT UNSIGNED,
  gender ENUM('male','female','other'),
  contact VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  image_path VARCHAR(255),
  medical_conditions JSON,
  symptoms JSON,
  taking_medication ENUM('yes','no','unsure'),
  medication_details TEXT,
  medication_allergies ENUM('yes','no','unsure'),
  allergy_details TEXT,
  illegal_drug_use ENUM('yes','no'),
  alcohol_frequency ENUM('daily','weekly','monthly','occasionally','never'),
  guardian_name VARCHAR(100),
  guardian_nid VARCHAR(20),
  guardian_contact VARCHAR(20),
  guardian_email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (resident_id) REFERENCES residents(id) ON DELETE SET NULL
) ENGINE=InnoDB;
