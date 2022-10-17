const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "es_db",
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (err) throw err;
    console.log('My Sql Connected Successfully')
})

module.exports = mysqlConnection