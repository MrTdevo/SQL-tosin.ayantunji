const { Client } = require("pg");
const inquirer = require("inquirer");

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to the employee_management database.");
  }
});

function viewDepartments() {
  client.query(
    'SELECT id AS "Department ID", name AS "Department Name" FROM department',
    (err, res) => {
      if (err) throw err;
      console.table(res.rows);
      client.end();
    }
  );
}

function viewRoles() {
  client.query(
    'SELECT id AS "Role ID", title AS "Role Title", salary AS "Salary", department_id AS "Department ID" FROM role',
    (err, res) => {
      if (err) throw err;
      console.table(res.rows);
      client.end();
    }
  );
}

function viewEmployees() {
  client.query(
    `SELECT employee.id AS "Employee ID", employee.first_name AS "First Name", employee.last_name AS "Last Name",
            role.title AS "Role", department.name AS "Department", role.salary AS "Salary",
            CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager"
     FROM employee
     LEFT JOIN role ON employee.role_id = role.id
     LEFT JOIN department ON role.department_id = department.id
     LEFT JOIN employee manager ON manager.id = employee.manager_id`,
    (err, res) => {
      if (err) throw err;
      console.table(res.rows);
      client.end();
    }
  );
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the new department:",
      },
    ])
    .then((answers) => {
      client.query(
        "INSERT INTO department (name) VALUES ($1)",
        [answers.departmentName],
        (err, res) => {
          if (err) throw err;
          console.log("Department added successfully.");
          client.end();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Enter the title of the new role:",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter the salary for the new role:",
      },
      {
        type: "input",
        name: "departmentId",
        message: "Enter the department ID for the new role:",
      },
    ])
    .then((answers) => {
      client.query(
        "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
        [answers.roleTitle, answers.roleSalary, answers.departmentId],
        (err, res) => {
          if (err) throw err;
          console.log("Role added successfully.");
          client.end();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the first name of the new employee:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the last name of the new employee:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the role ID for the new employee:",
      },
      {
        type: "input",
        name: "managerId",
        message: "Enter the manager ID for the new employee (if any):",
      },
    ])
    .then((answers) => {
      client.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
        [
          answers.firstName,
          answers.lastName,
          answers.roleId,
          answers.managerId || null,
        ],
        (err, res) => {
          if (err) throw err;
          console.log("Employee added successfully.");
          client.end();
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Enter the ID of the employee whose role you want to update:",
      },
      {
        type: "input",
        name: "newRoleId",
        message: "Enter the new role ID for the employee:",
      },
    ])
    .then((answers) => {
      client.query(
        "UPDATE employee SET role_id = $1 WHERE id = $2",
        [answers.newRoleId, answers.employeeId],
        (err, res) => {
          if (err) throw err;
          console.log("Employee role updated successfully.");
          client.end();
        }
      );
    });
}

inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    },
  ])
  .then((answers) => {
    switch (answers.action) {
      case "View all departments":
        console.log("Viewing all departments");
        viewDepartments();
        break;
      case "View all roles":
        console.log("Viewing all roles");
        viewRoles();
        break;
      case "View all employees":
        console.log("Viewing all employees");
        viewEmployees();
        break;
      case "Add a department":
        console.log("Adding a department");
        addDepartment();
        break;
      case "Add a role":
        console.log("Adding a role");
        addRole();
        break;
      case "Add an employee":
        console.log("Adding an employee");
        addEmployee();
        break;
      case "Update an employee role":
        console.log("Updating an employee role");
        updateEmployeeRole();
        break;
      default:
        console.log("No valid action selected");
        client.end();
        break;
    }
  });
