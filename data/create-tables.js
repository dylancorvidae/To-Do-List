const client = require('../../bc-summer-2019-demo/bootcamp-two/11-same-page-data/lib/client');

client.connect()
    .then(() => {
        return client.query(`
            CREATE TABLE types (
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL UNIQUE,
                complete BOOLEAN NOT NULL DEFAULT FALSE
            );

            CREATE TABLE cats (
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR(256) NOT NULL,
                type_id INTEGER NOT NULL REFERENCES types(id),
                url VARCHAR(256) NOT NULL,
                year INTEGER NOT NULL,
                lives INTEGER NOT NULL,
                is_sidekick BOOLEAN NOT NULL
            );
    `);
    })
    .then(
        () => console.log('create tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });