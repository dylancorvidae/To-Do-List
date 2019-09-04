const client = require('../lib/client.js');
const tasks = require('./taskitems.js');

client.connect()
    .then(() => {
        // "Promise all" does a parallel execution of async tasks
        return Promise.all(
            tasks.map(task => {
                return client.query(`
                    INSERT INTO tasks (name, completed)
                    VALUES ($1, $2)
                    RETURNING *;
                `,
                [task.name, task.completed])
                    .then(result => result.rows[0]);
            })
        );
    })
    .then(
        () => console.log('seed data load complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });