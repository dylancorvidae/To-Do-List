const client = require('../lib/client.js');

client.connect()
    .then(() => {
        return client.query(`
            DROP TABLE IF EXISTS tasks;
            DROP TABLE IF EXISTS users;
    `);
    })
    .then(
        () => console.log('drop tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });