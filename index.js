const http = require('http');
const mysql = require('mysql');

const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.end('<html><body><h1>Hello wolrd !</h1></body></html>');
}).listen(3000, 200);

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '',
    database : 'nodetest'
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected !');
});