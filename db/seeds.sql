INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('Marketing');


INSERT INTO role (title, salary, department_id) VALUES 
    ('Software Engineer', 80000, 1),
    ('Sales Manager', 70000, 2),
    ('Marketing Coordinator', 60000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
    ('Alice', 'Smith', 1, NULL),
    ('Bob', 'Johnson', 2, 1),
    ('Charlie', 'Williams', 3, NULL);