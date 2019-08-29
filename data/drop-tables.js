const client = require('../public/lib/client.js');

client.connect()
    .then(() => {
        return client.query(`
            DROP TABLE IF EXISTS tasks;
    `);
    })
    .then(
        () => console.log('drop tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });