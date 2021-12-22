const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const ejs = require('ejs');
const getProjects = require('../models/project');

console.log(getProjects);

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

















// Delete one sepecefid row using id
// con.query(
//     'DELETE FROM authors WHERE id = ?', [2], (err, result) => {
//         if(err) throw err;
//         console.log(`Deleted ${result.affectedRows} row(s)`);
//     }
// );
