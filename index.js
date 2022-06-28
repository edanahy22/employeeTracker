import inquirer from 'inquirer';
// const mysql2 = require('mysql2');
// const conslTable = require('console-table');


const createCompany = () => {
    inquirer
    .prompt([
        {
            type:'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View Employees', 'Add Employee', 'Update Employee', 'View Roles', 'Add Role', 'View Departments', 'Add Department', 'Done']
        }
    ])
    .then((response) => {
        console.log(response);
        switch (response.action) {
            case 'View Employees':
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee':
                updateEmployee();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
            default:
                compileCompany();
        }
    })
    .catch((err) => {
        console.error(err);
    }
    );
}

createCompany();