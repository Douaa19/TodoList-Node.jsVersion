const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const ejs = require('ejs');
const getProjects = require('./models/project');


getProjects((projects) => {
    console.log(projects);
});
// getProjects.getProjects(function(err, result) {
//     // TODO: Error handling.
//     console.log(result);
// });

const hostName = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'text/html');
    let page= '';
    switch(req.url) {
        case '/':
            page = 'index';
            getProjects((projects) => {
                res.writeHead(200 , {'Content-Type' : 'text/html'});
                let ejsFile = fs.readFileSync(path.join(__dirname, 'views', `${page}.ejs`) , 'utf-8');
                let ejsContent = ejs.render(ejsFile, {projects: projects})
                res.end(ejsContent);
            });
            
            
            break;
        case '/about':
            page = 'about.ejs';
            res.statusCode = 200;
            break;
        case '/contact':
            page = 'contact.ejs';
            res.statusCode = 200;
            break;
        // Redirect page
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            page = '404.ejs';
            res.statusCode = 404;
            break;
    }
    
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

















// Delete one sepecefid row using id
// con.query(
//     'DELETE FROM authors WHERE id = ?', [2], (err, result) => {
//         if(err) throw err;
//         console.log(`Deleted ${result.affectedRows} row(s)`);
//     }
// );
