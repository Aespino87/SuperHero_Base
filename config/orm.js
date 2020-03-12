// Brings in the MySQL Connection
const connection = require("../config/connection.js");


/// Generates ["?", "?", "?",].toString() => "?,?,?" 
function generateMarks(num) {
    const arr = [];

    for (var i = 0; i < num; i++) {

        //adds "?" to the end of an array
        arr.push("?");
    }
    return arr.toString();
}
//Converts object key/value pairs to SQL
function objToSql(obj) {
    const arr = [];

    for (const key in obj) {
        var value = obj[key];
        
        // Not sure what Object.uniqueProperty.call is, didn't seem to work
        // if (Object.uniqueProperty.call(obj, key)) {

        if (value != undefined && value != null) {

            //This add quotes if this is a string

            if(typeof value === "string") {
                value= "'" + value + "'";
            }

            arr.push(key + " = " + value);

        }   
    }

    return arr.toString();

}

// Convert an array to values list for a SQL create statement.
function valArrToCreateSql(valArr) {
    
    var sqlArr = [];
    for (i = 0; i < valArr.length; i++) {
        var value = valArr[i];
        // Quote strings
        if(typeof value === "string") {
            value= "'" + value + "'";
        }
        sqlArr.push(value);
    }
    return sqlArr.toString();
}

    const orm = {
        all: function(tableInput, cb) {
            let queryString = "SELECT * FROM " + tableInput + ";";
            connection.query(queryString, function(err, result) {
                if (err) {throw err;}
                    cb(result);

                });
            },
            // Creates the data in the table
            create: function(table, cols, vals, cb) {
                let queryString = "INSERT INTO " + table + " ";
                    // Setting operators to queryString values
                queryString += "(";
                queryString += cols.toString();
                queryString += ") ";
                queryString += "VALUES (";
                queryString += valArrToCreateSql(vals);
                queryString += ")";

                console.log(queryString);

                connection.query(queryString, vals, function(err, result) {
                    if (err) {throw err;}
                    cb(result);
                });
            },
// Updates the new table
            update: function(table, objColVals, condition, cb) {
                let queryString = "UPDATE " + table + " ";

                queryString += "SET ";
                queryString += objToSql(objColVals) + " ";
                queryString += "WHERE ";
                queryString += condition;

                console.log(queryString);

                connection.query(queryString, function(err, result){
                    if(err) { throw err;}
                    
                    cb(result);
                });
            },

            // Removes from initial table
            delete: function(table, condition, cb) {
                let queryString = "DELETE FROM " + table + " ";
                queryString += "WHERE ";
                queryString += condition;

                connection.query(queryString, function(err, result){
                    if(err) { throw err;}
                    cb(result);
                });
            }

        };

        module.exports = orm;

        ///Used CatsApp exercise for reference