// Sets up connection to MySQL
const mysql = require("mysql");

var connection;
// Checks to see if environment variable is there
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    const connection = mysql.createConnection( {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Windycity87",
        database: "superHeores_db"
    });
}

// Makes the Connection

connection.connect(function(err) {
    if (err) {
        // "err.stack" Shows where the error is occuring 
        console.error("Error making connection: " + err.stack);
        return;
    }
    console.log("connected as id" + connection.threadId);
});

module.exports = connection;



////// Used CatsApp as reference to build out code