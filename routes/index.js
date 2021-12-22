const http = require('http');
const fs = require('fs');
const mysql = require('mysql');


const hostName = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'text/html');

    let path = '../views/';
    switch(req.url) {
        case '/':
            path += 'index.ejs';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.ejs';
            res.statusCode = 200;
            break;
        // Redirect page
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.ejs';
            res.statusCode = 404;
            break;
    }
    
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            // res.write(data);
            res.end(data);
        }
    })
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
    console.log('Connected !');
});

// Select all from table and show it using foreach loop
const allData = con.query('SELECT * FROM authors', (err, rows) => {
    if(err) throw err;
    rows.forEach((row) => {
        console.log(`${row.name} lives in ${row.city}`);
    });
});


