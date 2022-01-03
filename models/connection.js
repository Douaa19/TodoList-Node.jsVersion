const mysql = require('mysql');
// Create connection with database using mysql module


const con = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password : '',
        database : 'todonode',
        multipleStatements: true
    }
);

con.connect((err) => {
    if(err) throw err;
    console.log('SQL Connected!');
});

module.exports = {
    con,
}