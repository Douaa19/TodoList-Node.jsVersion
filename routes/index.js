const http = require('http');
const mysql = require('mysql');
const url = require('url'); 
const fs = require('fs');


const hostName = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');
    
    
    
    if (req.url.endsWith('.html')) {
        const dir = req.url.slice(1, 7);
        const nameFile = req.url.slice(7);

        fs.stat(`../${dir}${nameFile}`, (err, stats) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            if (stats) {
                fs.createReadStream(`../${dir}${nameFile}`).pipe(res);
            } else {
                res.statusCode = 404;
                res.end('Sorry, this path does not found');
            }
        })
    }
});

server.listen(port, hostName, () => {
    console.log(`Listening for requests http://${hostName}:${port}`);
});

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '',
    database : 'nodetest'
});

con.connect((err) => {
    if (err) throw err;
    // console.log('Connected !');
});
