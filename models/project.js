// Require the model of connection
const {con} = require('./connection');


// Select all from table and show it using foreach loop
const getProjects = con.query('SELECT * FROM projects', (err, rows) => {
    if(err) throw err;
});

module.exports = {
    getProjects,
}

