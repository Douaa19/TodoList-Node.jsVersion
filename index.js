const http = require('http');
const fs = require('fs');
const route = require('url');
const pt = require('path');
const mysql = require('mysql');
const ejs = require('ejs');
const getProjects = require('./models/project');
const getTasks = require('./models/task');
const { deleteTask } = require('./models/task');
const { hostname } = require('os');
const port = 8000;
const host = 'localhost';



function handleServer(req, res) {
    const path = route.parse(req.url, true);
    const query = path.query;
    let page = 'req.url';

    res.setHeader('Content-Type', 'text/html');
    if (req.url === '/') {

        page = 'index';
        getProjects((projects) => {
            res.writeHead(200 , {'Content-Type' : 'text/html'});
            let ejsFile = fs.readFileSync(pt.join(__dirname, 'views', `${page}.ejs`) , 'utf-8');
            let ejsContent = ejs.render(ejsFile, {projects: projects})
            res.end(ejsContent);
        });
    }else if (path.pathname === '/project') {
        page = 'project';
        getTasks.getTasks(query.id_project, (tasks) => {
            res.writeHead(200 , {'Content-Type' : 'text/html'});
            let ejsFile = fs.readFileSync(pt.join(__dirname, 'views', `${page}.ejs`) , 'utf-8');
            let ejsContent = ejs.render(ejsFile, {tasks: tasks});
            res.end(ejsContent);
            path.path = '';
            console.log(path.path);
        });
    }else if(path.pathname === '/deleteTask') {
        // Delete fuction for task
        page = 'project';
        deleteTask(query.id_task);
        // Retourn to project page with new data
        getTasks.getTasks(query.id_project, (tasks) => {
            res.writeHead(200 , {'Content-Type' : 'text/html'});
            let ejsFile = fs.readFileSync(pt.join(__dirname, 'views', `${page}.ejs`) , 'utf-8');
            let ejsContent = ejs.render(ejsFile, {tasks: tasks});
            res.end(ejsContent);
        });
    }else if(path.pathname === '/addTask') {
        console.log(path.pathname);
    }else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end(`Page not found`);
    }
}

http.createServer(handleServer).listen(port, host);




















// const hostName = 'localhost';
// const port = 3000;


// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);
//     const pt = route.parse(req.url, true);
//     const query = pt.query;
//     console.log(query);


//     res.setHeader('Content-Type', 'text/html');
//     let page= '';
//     switch(req.url) {
//         case '/':
//             page = 'index';
//             getProjects((projects) => {
//                 res.writeHead(200 , {'Content-Type' : 'text/html'});
//                 let ejsFile = fs.readFileSync(path.join(__dirname, 'views', `${page}.ejs`) , 'utf-8');
//                 let ejsContent = ejs.render(ejsFile, {projects: projects})
//                 res.end(ejsContent);
//             });
//             break;
//         case '/project':
//             break;
//         case 'about':
//             page = 'about.ejs';
//             res.statusCode = 200;
//             break;
//         case '/contact':
//             page = 'contact.ejs';
//             res.statusCode = 200;
//             break;
//         // Redirect page
//         case '/about-us':
//             res.statusCode = 301;
//             res.setHeader('Location', '/about');
//             res.end();
//             break;
//         default:
//             page = '404.ejs';
//             res.statusCode = 404;
//             break;
//     }
    
// });

// server.listen(port, hostName, () => {
//     console.log(`Listening for requests http://${hostName}:${port}`);
// });

// Delete one sepecefid row using id
// con.query(
//     'DELETE FROM authors WHERE id = ?', [2], (err, result) => {
//         if(err) throw err;
//         console.log(`Deleted ${result.affectedRows} row(s)`);
//     }
// );
