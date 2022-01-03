const {con} = require('./connection');

// Get All Tasks From Tasks Table That Have A Specefique Id Project


let getTasks = (id, callback) => {
    // console.log(id);
    con.query(`SELECT * FROM tasks WHERE id_project= ${id}`, function(err, res) {
        if(err) throw err;
        let tasks = [];
        res.forEach(row => {
            tasks.push({
                id_task: row.id_task,
                id_project: row.id_project,
                name: row.name,
                status: row.status,
                description: row.description
            });
        });
        callback(tasks);
    });
}

let deleteTask = (id) => {
    con.query(`DELETE FROM tasks WHERE id_task= ${id}`, function(err, res) {
        if(err) throw err;
    });
}

let addTask = (infos) => {
    con.query(`INSERT INTO tasks SET ?`, infos, (err, res) => {
        if(err) throw err;
    });
}

module.exports = {
    getTasks: getTasks,
    deleteTask: deleteTask,
    addTask: addTask
};