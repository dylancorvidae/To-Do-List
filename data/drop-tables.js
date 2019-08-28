const client = require('../../bc-summer-2019-demo/bootcamp-two/11-same-page-data/lib/client');

client.connect()
    .then(() => {
        return client.query(`
            DROP TABLE IF EXISTS cats;
            DROP TABLE IF EXISTS types;
    `);
    })
    .then(
        () => console.log('drop tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });