const inquirer = require('inquirer');
const mysql2 = require('mysql2');
require('console.table');

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
    console.log("here");
    const sql = `SELECT * FROM employee`;
    db.query(sql, function(err, result) {
      if (err) {
        console.err(err)
      }
      console.table(result);
      return result;
    })
   
}

const addEmployee = () => {
    inquirer
      .prompt([
        {
            type:'input',
            name: 'first_name',
            message: "What is your employee's first name?",
    
        },
        {
            type:'input',
            name: 'last_name',
            message: "What is your employee's last name?",
    
        },
        {
            type:'list',
            name: 'role_id',
            message: "What is your employee's role?",
            choices:[{name: "Manager", value: 3}, {name:"Human Resources Specialist", value: 2}, {name: "Engineer", value: 1}]
    
        },
        {
            type:'list',
            name: 'manager_id',
            message: "Who is the employee's manager?",
            choices:[{name: "Krabs", value: 3}]
    
        }, 
    ])
    .then(results => {
        console.log(results)
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;
    const params = [results.first_name, results.last_name, results.role_id, results.manager_id];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.err(err)
      }
      console.log(result);
    //   return result;
    });
    })     
    
    
}

const updateEmployee = () => {

}

const viewRoles =  () => {
    const sql = `SELECT * FROM e_role`;
    db.query(sql, function(err, result) {
      if (err) {
        console.err(err)
      }
      console.table(result);
      return result;
    })
  
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
    //   return result;
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
        switch (response.menu) {
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