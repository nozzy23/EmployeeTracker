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
    begin();
});

console.table([
    
])

//starts asking if you would like to add or remove a employee.
function begin(){
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
            name: "employeeID",
            type: "input",
            message: "Please provide New employees ID."
        },
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
            "INSERT INTO EMPLOYEE (ID,FIRST_NAME,LAST_NAME, ROLE_ID, MANAGER_ID) VALUES (ID,FIRST_NAME,LAST_NAME,ROLE_ID,Manager_ID);",
        {
            employee_ID: answer.employeeID,
            first_Name: answer.employeeFirst,
            last_Name: answer.employeeLast,
            job_Title: answer.employeeTitleID || 0,
            reporting_manager: answer.ManagerID || 0
        },
        function (err){
            if (err) throw err;
            console.log("You've added a new employee succesfully!");
            begin();
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
            begin();
        }
    )
})
}