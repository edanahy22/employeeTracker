const inquirer = require('inquirer');
const mysql2 = require('mysql2');
// const conslTable = require('console-table');

// Connect to database
const db = mysql2.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Finnegan23',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

const compileCompany= () => {

}

const viewEmployees = () => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, result) => {
      if (err) {
        console.err(err)
      }
      console.log(result);
      return result;
    });
}

const addEmployee = () => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, result) => {
      if (err) {
        console.err(err)
      }
      console.log(result);
      return result;
    });
}

const updateEmployee = () => {

}

const viewRoles =  () => {
    const sql = `SELECT * FROM e_role`;
    db.query(sql, (err, result) => {
      if (err) {
        console.err(err)
      }
      console.log(result);
      return result;
    });
}

const addRole = () => {

}

const viewDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
      if (err) {
        console.err(err)
      }
      console.log(result);
      return result;
    });
}

const addDepartment = () => {

}

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