INSERT INTO health_package (id, package_name, description, cost, category) VALUES
(1, 'Basic',    'Essential annual health screening',              500.00,  'BASIC'),
(2, 'Standard', 'Comprehensive organ & system panel',           3000.00,  'STANDARD'),
(3, 'Premium',  'Full-body diagnostics with doctor consult',    5000.00,  'PREMIUM');

INSERT INTO package_test (package_id, test_name) VALUES
(1,'Complete Blood Count (CBC)'),
(1,'Blood Glucose - Fasting'),
(1,'Blood Pressure Check'),
(1,'BMI Assessment'),
(1,'Urine Routine Test');

INSERT INTO package_test (package_id, test_name) VALUES
(2,'Complete Blood Count (CBC)'),
(2,'Lipid Profile'),
(2,'Blood Glucose Fasting & PP'),
(2,'Liver Function Test (LFT)'),
(2,'Kidney Function Test (KFT)'),
(2,'Thyroid Profile (TSH)'),
(2,'Chest X-Ray'),
(2,'ECG'),
(2,'Urine & Stool Routine');

INSERT INTO package_test (package_id, test_name) VALUES
(3,'Complete Blood Count (CBC)'),
(3,'Full Lipid Profile'),
(3,'Blood Glucose HbA1c'),
(3,'Liver & Kidney Function Tests'),
(3,'Thyroid Profile T3, T4, TSH'),
(3,'Vitamin B12 & Vitamin D'),
(3,'Iron Studies - Serum Ferritin'),
(3,'Chest X-Ray & ECG'),
(3,'Ultrasound Abdomen'),
(3,'Cancer Marker Panel PSA/CA-125'),
(3,'Eye & Dental Check-up'),
(3,'Physician Consultation');
