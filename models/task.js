const {connect} = require('./connection');

// 
const getTasks = connect.query('SELECT * FROM tasks', (err, rows) => {
    if(err) throw err;
});

module.exports = {
    getTasks,
}