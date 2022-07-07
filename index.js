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

let employeeArr = [];
let roleArr = [];
let departmentArr = [];

const departmentList = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if (err) {
            console.err(err)
        }
        departmentArr = result.map(res => ({
            value: res.id, name: res.d_name
        }));
        return result;
    });
}

const roleList = () => {
    const sql = `SELECT * FROM e_role`;
    db.query(sql, (err, result) => {
        if (err) {
            console.err(err)
        }
        roleArr = result.map(res => ({
            value: res.id, name: res.title
        }));
        return result;
    });
}

const viewEmployees = () => {
    console.log("here");
    const sql = `SELECT * FROM employee`;
    db.query(sql, function (err, result) {
        if (err) {
            console.err(err)
        }
        console.table(result);
        createCompany();
        return result;
    })

}

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is your employee's first name?",

            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is your employee's last name?",

            },
            {
                type: 'list',
                name: 'role_id',
                message: "What is your employee's role?",
                choices: roleArr
                // choices: [{ name: "Manager", value: 3 }, { name: "Human Resources Specialist", value: 2 }, { name: "Engineer", value: 1 }]

            },
            {
                type: 'list',
                name: 'manager_id',
                message: "Who is the employee's manager?",
                choices: [{ name: "Krabs", value: 3 }]

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
                console.table(result);
                createCompany();
                return result;
            });
        })


}

const updateEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'update',
                message: "Which employee would you like to update?",
                choices: employeeArr

            }

        ])
    // const sql =  `UPDATE employee SET first_name = ? WHERE id = ?`;
    // const params = 
    // db.query(sql, params, (err, result) => {
    //     if (err) {
    //       res.status(400).json({ error: err.message });
    //     } else if (!result.affectedRows) {
    //       res.json({
    //         message: 'Movie not found'
    //       });
    //     } else {
    //       res.json({
    //         message: 'success',
    //         data: req.body,
    //         changes: result.affectedRows
    //       });
    //     }}
}

const viewRoles = () => {
    const sql = `SELECT * FROM e_role`;
    db.query(sql, function (err, result) {
        if (err) {
            console.err(err)
        }
        console.table(result);
        roleArr = result.map(res => ({
            value: res.id, name: res.title
        }));
        createCompany();
        return result;
    })
    
}

const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: "What is the title of the role?",

            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the salary for this role?",

            },
            {
                type: 'list',
                name: 'department_id',
                message: "Which department does this role belong to?",
                choices: departmentArr
                // choices: [{ name: "Management", value: 3 }, { name: "Human Resources", value: 2 }, { name: "Software Design", value: 1 }]

            },
        ])

        .then(results => {
            console.log(results)
            const sql = `INSERT INTO e_role (title, salary, department_id)
    VALUES (?, ?, ?)`;
            const params = [results.title, results.salary, results.department_id];
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.err(err)
                }
                console.table(result);
                roleArr = result.map(res => ({
                    value: res.id, name: res.title
                }));
                createCompany();
                return result;
            });
        })
}

const viewDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if (err) {
            console.err(err)
        }
        console.table(result);
        departmentArr = result.map(res => ({
            value: res.id, name: res.d_name
        }));
        createCompany();
        return result;
    });
}

const addDepartment = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'd_name',
            message: "What is the name of the department?",

        }
    ])

    .then(results => {
        console.log(results)
        const sql = `INSERT INTO department (d_name) VALUES (?)`;
        const params = [results.d_name];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(err)
            }
            console.table(result);
            createCompany();
            departmentArr = result.map(res => ({
                value: res.id, name: res.d_name
            }));
            return result;
        });
    })
}

const createCompany = () => {
    departmentList();
    roleList();
    inquirer
        .prompt([
            {
                type: 'list',
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
                    break;
                default:
                    db.end();
            }
        })
        .catch((err) => {
            console.error(err);
        }
        );
}

createCompany();