// Require the model of connection
const {con} = require('./connection');


let getProjects = (callback) => {
    
    con.query('SELECT * FROM projects', function(err, res, fields) {
        if(err) throw err;
        let projects = [];
        res.forEach(row => {
            projects.push( {
                id_project: row.id_project,
                title: row.title,
                description: row.description
            }); 
        });
        callback(projects);
    });
    
}

module.exports = getProjects;