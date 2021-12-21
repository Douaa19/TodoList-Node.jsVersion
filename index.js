const http = require('http');
const mysql = require('mysql');
const url = require('url'); 
const fs = require('fs');


const hostName = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/contact':
            path += 'contact.html';
            res.statusCode = 200;
            break;
        // Redirect page
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
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



// const hostName = 'localhost';
// const port = 3030;


// // Create a server object
// const server = http.createServer((req, res) => {

//     if(req.url.endsWith('.html')) {
//         const htmlFile = req.url.slice(1);
//         fs.stat(`./${htmlFile}`, (err, stats) => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'text/html');
//             if(stats) {
//                 fs.createReadStream(htmlFile).pipe(res);
//             } else {
//                 res.statusCode = 404;
//                 res.end('Sorry, page not found');
//             }
//         });
//     }
// });



