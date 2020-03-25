const mysql= require("mysql");
const inquire= require ("inquirer");
const console_table= require("console.table");

const connection=mysql.createConnection({
    host:"localhost",
    port:8889,
    user:"root",
    password:"root",
    database:"EMPLOYEE_TRACK"
});

connection.connect(function(err){
    if (err) throw err;
    welcome();
});

console.table([
    {
        Employee_id: 0,
        Name: "Oscar Nunez",
        Role_ID: 2,
        Manager_ID:0
    }

]);

//BEGINNING CHOICES
function welcome(){
    inquire.prompt({
        name: "Welcome",
        type: "list",
        message: "Hello Would you like to",
        choices: ["AddInformation", "ViewInformation", "UpdateRole", "EXIT"]
        })
.then(function(answer){
    if (answer.Welcome === "AddInformation") {
        start();
        }
        else if(answer.Welcome === "ViewInformation") {
        beginRole();
        }
        else if(answer.Welcome === "UpdateRole"){
            //function
        } 
        else{
        connection.end();
        }
});
}


//Start by presenting options
function start(){
    inquire.prompt({
        name: "ADDING",
        type: "list",
        message: "Hello Would you like to add a",
        choices: ["EMPLOYEE", "ROLE", "DEPARTMENT", "EXIT"]
        })
.then(function(answer){
    if (answer.ADDING === "EMPLOYEE") {
        beginEmployee();
        }
        else if(answer.ADDING === "ROLE") {
        beginRole();
        }
        else if(answer.ADDING === "DEPARTMENT"){
            //function
        } 
        else{
        connection.end();
        }
});
}

//starts asking if you would like to add or remove a employee.
function beginEmployee(){
    inquire.prompt({
    name: "addOrDelete",
    type: "list",
    message: "Would you like to add a new Employee or remove one?",
    choices: ["ADD", "REMOVE", "EXIT"]
    })
    .then(function(answer){
        if (answer.addOrDelete === "ADD") {
            Addemployee();
          }
          else if(answer.addOrDelete === "REMOVE") {
            removeEmployee();
          } else{
            connection.end();
          }
    });
}

function Addemployee(){
    inquire.prompt([
        {
            name: "employeeFirst",
            type: "input",
            message: "Employee first name."
        },
        {
            name: "employeeLast",
            type: "input",
            message: "Employee last name."
        },
        {
            name: "employeeTitleID",
            type: "input",
            message: "Employees Job title ID"
        },
        {
            name: "ManagerID",
            type: "input",
            message: "Reporting Manager ID.",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        }
    ])
    .then(function(answer){
    connection.query (
            "INSERT INTO EMPLOYEE (FIRST_NAME,LAST_NAME, ROLE_ID, MANAGER_ID) VALUES (?)",
        {
            FIRST_NAME: answer.employeeFirst,
            LAST_NAME: answer.employeeLast,
            ROLE_ID: parseInt(answer.employeeTitleID) || 0,
            MANAGER_ID: parseInt(answer.ManagerID) || 0
        },
        function (err){
            if (err) throw err;
            console.log("You've added a new employee succesfully!");
            welcome();
        }
    );
    });
}

function removeEmployee(){
    inquire.prompt([
        {
            name: "RemoveEmployeeID",
            type: "input",
            message: "Please provide employees ID."
        }
    ])
    .then(function(answer){
    connection.query(
        "DELETE FROM EMPLOYEE WHERE ID = ?",{
        UpdateEmployee_ID: answer.RemoveEmployeeID
        },
        function (err)
        {
            if (err) throw err;
            console.log("You have removed a employee succesfully!");
            welcome();
        }
    )
})
};

function beginRole(){
    inquire.prompt({
    name: "addOrDelete",
    type: "list",
    message: "Would you like to add a new Role or remove one?",
    choices: ["ADD", "REMOVE", "EXIT"]
    })
    .then(function(answer){
        if (answer.addOrDelete === "ADD") {
            addRole();
          }
          else if(answer.addOrDelete === "REMOVE") {
            removeEmployee();
          } else{
            connection.end();
          }
    });
}

function addRole(){
    inquire.prompt([
        {
            name: "Title",
            type: "input",
            message: "Please enter Employees new Job title."
        },
        {
            name: "employeeSalary",
            type: "input",
            message: "Employee starting salary."
        },
        {
            name: "employeeDepartmentID",
            type: "input",
            message: "Please enter depeartment ID", validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        },
    ])
    .then(function(answer){
    connection.query (
            "INSERT INTO ROLE (TITLE,SALARY, DEPARTMENT_ID) VALUES (?)",
        {
            TITLE: answer.Title,
            SALARY: answer.employeeSalary,
            DEPARTMENT_ID: parseInt(answer.employeeDepartmentID) || 0
        },
        function (err){
            if (err) throw err;
            console.log("You've added a new role");
            start();
        }
    );
    });
}