const mysql = require('mysql');
// Create connection with database using mysql module


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