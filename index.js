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
        fs.stat(`./${dir}${nameFile}`, (err, stats) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            if (stats) {
                fs.createReadStream(dir + nameFile).pipe(res);
            } else {
                res.statusCode = 404;
                res.end('Sorry, page does not found');
            }
        })
    }

    // let path = './views/';
    // switch(req.url) {
    //     case '/':
    //         path += 'index.html';
    //         res.statusCode = 200;
    //         break;
    //     case '/about':
    //         path += 'about.html';
    //         res.statusCode = 200;
    //         break;
    //     case '/contact':
    //         path += 'contact.html';
    //         res.statusCode = 200;
    //         break;
    //     // Redirect page
    //     case '/about-us':
    //         res.statusCode = 301;
    //         res.setHeader('Location', '/about');
    //         res.end();
    //         break;
    //     default:
    //         path += '404.html';
    //         res.statusCode = 404;
    //         break;
    // }
    
    // fs.readFile(path, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         res.end();
    //     } else {
    //         // res.write(data);
    //         res.end(data);
    //     }
    // })
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
