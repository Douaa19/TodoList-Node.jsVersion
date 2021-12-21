const http = require('http');
const mysql = require('mysql');
const url = require('url'); 
const fs = require('fs');

consolenst = hostname = '127.0.0.1';
const port = 3000;


// Create a server object
const server = http.createServer((req, res) => {

    if(req.url.endsWith('.html')) {
        const htmlFile = req.url.slice(1);
        fs.stat(`./${htmlFile}`, (err, stats) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            if(stats) {
                fs.createReadStream(htmlFile).pipe(res);
            } else {
                res.statusCode = 404;
                res.end('Sorry, page not found');
            }
        });
    }
});

server.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
});

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

