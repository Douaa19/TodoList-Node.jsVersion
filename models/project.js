// Require the model of connection
const {con} = require('./connection');


// Select all from table and show it using foreach loop
const querySelect = 'SELECT * FROM projects';
const getProjects = con.query(querySelect, (err, rows) => {
    if(err) throw err;
    else {
        return rows;
    }
});

module.exports = {
    getProjects,
}

