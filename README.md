# Employee Management System

## Overview

The Employee Management System is a command-line application designed to manage a company's employee database. Utilizing Node.js, Inquirer, and PostgreSQL, this application provides an intuitive interface for managing departments, roles, and employees.

## User Story

As a business owner,  
I want to be able to view and manage the departments, roles, and employees in my company,  
so that I can effectively organize and plan my business operations.

## Features

- **View All Departments**: Display a table with department names and IDs.
- **View All Roles**: Show a table with job titles, role IDs, associated departments, and salaries.
- **View All Employees**: Present a table with employee IDs, first names, last names, job titles, departments, salaries, and their managers.
- **Add a Department**: Prompt to enter a department name and add it to the database.
- **Add a Role**: Prompt to provide a role title, salary, and department ID, and add the role to the database.
- **Add an Employee**: Prompt to enter an employee’s first name, last name, role ID, and manager ID, and add the employee to the database.
- **Update an Employee Role**: Prompt to select an employee and specify a new role ID to update their role in the database.

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies:
   
   - npm install npm i 
   
 # Install Inquirer version 8.2.4:
  inquirer@8.2.4


# Configure your PostgreSQL database and set up environment variables:
- DB_USER=your_database_user
- DB_HOST=your_database_host
- DB_NAME=your_database_name
- DB_PASSWORD=your_database_password
c DB_PORT=your_database_port

# Usage
# 1. Launch the application by running:
- node index.js
- Follow the on-screen prompts to manage departments, roles, and employees.



# Functions
- viewDepartments: Lists all departments in a formatted table.
- viewRoles: Displays roles with job titles, IDs, department associations, and salaries in a formatted table.
- viewEmployees: Shows all employees with their details in a formatted table.
- addDepartment: Adds a new department to the database.
- addRole: Adds a new role to the database.
- addEmployee: Adds a new employee to the database.
- updateEmployeeRole: Updates the role of an existing employee.


# License
- This project is licensed under the MIT License.

<video controls src="20240807-0351-00.3374425.mp4" title="Title"></video>