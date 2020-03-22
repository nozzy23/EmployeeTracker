const mysql=require("mysql");

const connection=mysql.createConnection({
    host:"localhost",
    port:8889,
    user:"root",
    password:"root",
    database:"EMPLOYEE_TRACK"
});

connection.connect(function(err){
    if (err) throw err;

})

function begin(){
    inquire.prompt({
        name: ""
    })
}