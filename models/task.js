const {con} = require('./connection');

// Get All Tasks From Tasks Table That Have A Specefique Id Project


let getTasks = (id, callback) => {
    con.query(`SELECT * FROM tasks WHERE id_project= ${id}`, function(err, res) {
        if(err) throw err;
        let tasks = [];
        res.forEach(row => {
            tasks.push({
                id: row.id,
                id_project: row.id_project,
                name: row.name,
                description: row.description
            });
        });
        callback(tasks);
    });
}

module.exports = getTasks;