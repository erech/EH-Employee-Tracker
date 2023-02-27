INSERT INTO department (dept_name)
VALUES 
('Formulations'),
('QC/QA'),
('Product Support'),
('R&D');


INSERT INTO role (title, salary, dept_id)
VALUES 
('Engineer Scientist', 70000, 1),
('Chemist', 70000, 2),
('Researcher', 85000, 3),
('Senior Engineer', 175000, 1),
('Senior Chemist', 175000, 2),
('Staff Scientist', 200000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Rick', 'Chen', 1, NULL),
('Johnny', 'Suh', 2, 1),
('Elon', 'Musk', 3, 2),
('Jelly', 'Fish', 4, 3),
('Aaron', 'One', 5, 4),
('Aaron', 'Two', 6, NULL),
('Jennifer', 'Give', 7, NULL);