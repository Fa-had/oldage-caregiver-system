-- Insert rooms
INSERT INTO rooms (id, room_number, capacity, occupied, status)
VALUES
  (1, '101', 4, 2, 'available'),
  (2, '102', 4, 3, 'full'),
  (3, '103', 6, 0, 'available'),
  (4, '104', 2, 1, 'available');

-- Insert staff (id specified for predictable FKs)
INSERT INTO staff (id, full_name, role, work_hours, contact, email, status)
VALUES
  (1, 'Sayed', 'admin', '09:00-17:00', '+8801711000001', 'rafiqul.islam@example.com', 'active'),
  (2, 'Ayesha Begum', 'resident_care', '07:00-15:00', '+8801711000002', 'ayesha.begum@example.com', 'active'),
  (3, 'Kamal Hossain', 'resident_care', '10:00-18:00', '+8801711000003', 'kamal.hossain@example.com', 'active'),
  (4, 'Shahriar Alam', 'cook', '06:00-14:00', '+8801711000004', 'shahriar.alam@example.com', 'active'),
  (5, 'Rina Sultana', 'resident_care', '14:00-22:00', '+8801711000005', 'rina.sultana@example.com', 'active');

-- Insert residents (linking caregiver_id and room_id)
INSERT INTO residents (id, resident_code, full_name, age, gender, joining_date, caregiver_id, status, room_id)
VALUES
  (1, 'R-0001', 'Abdul Karim', 78, 'male', '2023-02-15', 2, 'active', 1),
  (2, 'R-0002', 'Fatima Khatun', 82, 'female', '2022-11-03', 3, 'active', 1),
  (3, 'R-0003', 'Mohiuddin Ahmed', 70, 'male', '2024-01-20', 2, 'active', 2),
  (4, 'R-0004', 'Hamida Parvin', 75, 'female', '2021-06-12', 5, 'active', 2),
  (5, 'R-0005', 'Nurul Islam', 68, 'male', '2020-09-30', 3, 'inactive', 2),
  (6, 'R-0006', 'Shirin Akter', 73, 'female', '2024-09-10', 5, 'active', 4);

-- Update rooms.occupied if you want to ensure accurate totals (optional)
UPDATE rooms SET occupied = (
  SELECT COUNT(*) FROM residents r WHERE r.room_id = rooms.id
);

-- Insert users (accounts). password_hash values are placeholders.
INSERT INTO users (id, full_name, email, password_hash, role, staff_id, resident_id)
VALUES
  (1, 'sayed', 'admin@eldercare.bd', '1234', 'admin', 1, NULL),
  (2, 'Ayesha Begum', 'ayesha.care@eldercare.bd', '1234', 'resident_care', 2, NULL),
  (3, 'Visitor Office', 'visitors@eldercare.bd', '1234', 'visitor', NULL, NULL),
  (4, 'Abdul Karim', 'abdul.karim@example.com', '1234', 'resident', NULL, 1),
  (5, 'Fatima Khatun', 'fatima.khatun@example.com', '1234', 'resident', NULL, 2),
  (6, 'Kamal Hossain', 'kamal.care@eldercare.bd', '1234', 'resident_care', 3, NULL);

-- Admissions (some linked to existing residents, some new)
INSERT INTO admissions (id, resident_id, form_filled_by, full_name, nid, age, gender, contact, email, medical_conditions, symptoms, taking_medication, medication_details, medication_allergies, allergy_details, illegal_drug_use, alcohol_frequency, guardian_name, guardian_contact)
VALUES
  (1, 1, 'guardian', 'Abdul Karim', '1982012345', 78, 'male', '+8801712000001', NULL, JSON_ARRAY('hypertension'), JSON_ARRAY('dizziness'), 'yes', 'Atenolol 50mg daily', 'no', NULL, 'no', 'occasionally', 'Rahim Karim', '+8801713000001'),
  (2, 2, 'guardian', 'Fatima Khatun', '1983012345', 82, 'female', '+8801712000002', NULL, JSON_ARRAY('diabetes','arthritis'), JSON_ARRAY('fatigue', 'joint pain'), 'yes', 'Metformin 500mg twice daily', 'no', NULL, 'no', 'occasionally', 'Salim Khatun', '+8801713000002'),
  (3, NULL, 'elderly', 'Azizur Rahman', '1984012345', 66, 'male', '+8801712000003', 'azizur@example.com', JSON_ARRAY('none'), JSON_ARRAY('none'), 'no', NULL, 'no', NULL, 'no', 'never', NULL, NULL),
  (4, 6, 'guardian', 'Shirin Akter', '1985012345', 73, 'female', '+8801712000006', NULL, JSON_ARRAY('asthma'), JSON_ARRAY('shortness of breath'), 'yes', 'Salbutamol as needed', 'no', NULL, 'no', 'occasionally', 'Mst. Afsana', '+8801713000006');

-- Appointments (visitors)
INSERT INTO appointments (id, visitor_name, visitor_contact, resident_id, purpose, appointment_time, status)
VALUES
  (1, 'Tarek Hasan', '+8801714000001', 1, 'Family visit - son', '2025-10-20 15:30:00', 'approved'),
  (2, 'Sadia Rahman', '+8801714000002', 2, 'Daughter visiting', '2025-10-22 11:00:00', 'pending'),
  (3, 'Rashed Chowdhury', '+8801714000003', NULL, 'General enquiry', '2025-10-23 10:00:00', 'pending');

-- Meals (orders)
INSERT INTO meals (id, resident_id, requested_by_staff_id, date, type, quantity, spicy, sugar_free, salt_free, notes, status)
VALUES
  (1, 1, 2, '2025-10-20', 'breakfast', 1, FALSE, FALSE, FALSE, 'Soft porridge requested', 'delivered'),
  (2, 2, 3, '2025-10-20', 'lunch', 1, FALSE, FALSE, FALSE, 'No fish (preference)', 'prepared'),
  (3, 3, 2, '2025-10-21', 'dinner', 1, TRUE, FALSE, TRUE, 'Low salt', 'pending'),
  (4, 4, 5, '2025-10-21', 'lunch', 1, FALSE, TRUE, FALSE, 'Sugar-free dessert', 'delivered'),
  (5, 6, 5, '2025-10-21', 'breakfast', 1, FALSE, FALSE, FALSE, NULL, 'pending');

-- Medical records
INSERT INTO medical_records (id, resident_id, staff_id, date, temperature, blood_pressure_systolic, blood_pressure_diastolic, heart_rate, oxygen_level, `condition`, notes)
VALUES
  (1, 1, 2, '2025-10-19', 36.8, 140, 85, 78, 96, 'slightly_elevated', 'BP slightly high, monitoring'),
  (2, 2, 3, '2025-10-19', 36.5, 130, 80, 74, 97, 'normal', 'Routine checkup'),
  (3, 3, 2, '2025-10-20', 37.1, 125, 78, 82, 95, 'normal', 'No acute issues'),
  (4, 4, 5, '2025-10-21', 36.7, 135, 88, 76, 96, 'normal', 'Joint pain pain noted'),
  (5, 6, 5, '2025-10-21', 36.9, 120, 75, 70, 98, 'normal', 'Asthma well controlled');

-- Notices
INSERT INTO notices (id, type, message, created_by, sender_name, sender_role)
VALUES
  (1, 'info', 'Weekly prayer and gathering on Friday at 10:00 AM in the common hall.', 1, 'Md. Rafiqul Islam', 'admin'),
  (2, 'urgent', 'Cold & flu season notice: extra hand hygiene and mask recommended for visitors.', 1, 'Md. Rafiqul Islam', 'admin'),
  (3, 'warning', 'Maintenance: Water will be shut down for 2 hours on 2025-10-25 for repairs.', 1, 'Md. Rafiqul Islam', 'admin');

-- Donations
INSERT INTO donations (id, donor_name, amount, type, notes, status)
VALUES
  (1, 'Sajeda Foundation', 50000.00, 'cash', 'Monthly support for medicines', 'completed'),
  (2, 'Local Grocery Mart', 0.00, 'goods', 'Monthly rice and lentils donation', 'completed'),
  (3, 'Khan Brothers', 15000.00, 'cash', 'Event sponsorship', 'pending');

-- Finance entries
INSERT INTO finance (id, type, category, description, amount, payment_method, date, notes)
VALUES
  (1, 'income', 'donation', 'Sajeda Foundation monthly donation', 50000.00, 'bank', '2025-10-01', NULL),
  (2, 'expense', 'medicine', 'Monthly purchase of medicines', 12000.00, 'card', '2025-10-10', 'Invoice #MED-2025-10'),
  (3, 'expense', 'food', 'Groceries for residents (weekly)', 8000.00, 'cash', '2025-10-18', NULL),
  (4, 'income', 'donation', 'Khan Brothers donation', 15000.00, 'bank', '2025-10-15', NULL);

-- ====== End of seed data ======
