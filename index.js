const http = require('http');
const mysql = require('mysql');
const url = require('url'); 


const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === '/about') {
        res.write('Welcome to about page');
        res.end();
    } else if (url === '/contact') {
        res.write('Welcome to contact us page');
        res.end();
    }else {
        res.write('Hello World !');
        res.end();
    }
}).listen(3000);

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

