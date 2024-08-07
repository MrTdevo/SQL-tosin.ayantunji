SELECT id AS "Department ID", name AS "Department Name" 
FROM department;


SELECT r.id AS "Role ID", r.title AS "Job Title", d.name AS "Department", r.salary AS "Salary"
FROM role r
JOIN department d 
ON r.department_id = d.id;




SELECT e.id AS "Employee ID", e.first_name AS "First Name", e.last_name AS "Last Name", 
       r.title AS "Job Title", d.name AS "Department", r.salary AS "Salary",
       CONCAT(m.first_name, ' ', m.last_name) AS "Manager"
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;