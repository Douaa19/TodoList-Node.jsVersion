const mysql = require('mysql');
// Create connection with database using mysql module

class Database {
    constructor(host, user, password, database, multipleStatements) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
        this.multipleStatements = true
    }
}

const con = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password : '',
        database : 'todonode'
    }
);

con.connect((err) => {
    if(err) throw err;
    console.log('Connected!');
});

module.exports = {
    con,
}