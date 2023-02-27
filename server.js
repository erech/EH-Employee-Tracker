const mysql = require('mysql2')
const inquirer = require('inquirer')
const console = require('console.table')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nopass',
    database: 'corporate_db',
  })

connection.connect(err => {
    if (err) throw err;
    console.log("woo");
    startMenu();
})

const init = () => {
    inquirer.prompt({
        message: 'Get started',
        name: 'menu',
        type: 'list',
        choices: [ 
          'Departments',
          'Employees',
          'Roles',
          'Add department',
          'Add role',
          'Add employee',
          'Update employee role',
          'Exit',
        ],
      })

      .then(response => {
        switch (response.menu) {
        case 'Departments':
            departments();
            break;
        case 'Employees':
            employees();
            break;
        case 'Roles':
            roles();
            break;
        case 'Add department':
          addDepartment();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Update employee role':
          update();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          connection.end();
      }
    })
}

const department = () => {
    connection.query('SELECT * FROM department', function (err, res) {
      if (err) throw err
      console.table(res)
      startMenu()
    })
  }

  const roles = () => {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err
        console.table(res)
        startMenu()
    })
}

const employees = () => {
    connection.query(
      'SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN role ON dept.id = role.dept_id) JOIN employee ON role.id = employee.role_id);',
      function (err, res) {
        if (err) throw err
        console.table(res)
        startMenu()
      })
  }

  const addDepartment = () => {
    inquirer.prompt([
        {
          name: 'department',
          type: 'input',
          message: 'Enter department name',
        },
      ])
      .then(answer => {
        connection.query(
          'INSERT INTO department (dept_name) VALUES (?)',
          [answer.department],
          function (err, res) {
            if (err) throw err;
            console.log('Added the Depts');
            startMenu();
          }
        )})
  }

  const addRole = () => {
    inquirer.prompt([
        {
          name: 'roleTitle',
          type: 'input',
          message: 'Enter role',
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Enter the zeros $$$',
        },
        {
          name: 'deptId',
          type: 'input',
          message: 'Enter department ID?',
        },
      ])
      .then(answer => {
        connection.query(
          'INSERT INTO role (title, salary, dept_id) VALUES (?, ?, ?)',
          [answer.roleTitle, answer.salary, answer.deptId],
          function (err, res) {
            if (err) throw err
            console.log('Zeroes$$$ added')
            startMenu()
          }
        )})
  }

    const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: "Enter first name",
        },
        {
            name: 'lastName',
            type: 'input',
            message: "Enter last name",
        },
        {
            name: 'roleId',
            type: 'input',
            message: "Enter role ID",
        },
        {
            name: 'managerId',
            type: 'input',
            message: 'Enter manager ID',
        },
        ])
        .then(answer => {
        connection.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
            function (err, res) {
            if (err) throw err
            console.log('Added employee');
            startMenu();
            }
        )})
    }

    const update = () => {
        inquirer
          .prompt([
            {
              name: 'id',
              type: 'input',
              message: 'Enter employee id',
            },
            {
              name: 'roleId',
              type: 'input',
              message: 'Enter new role id',
            },
          ])
          .then(answer => {
            connection.query(
              'UPDATE employee SET role_id=? WHERE id=?',
              [answer.roleId, answer.id],
              function (err, res) {
                if (err) throw err;
                console.log('updated');
                startMenu();
              }
            )})
      }
    