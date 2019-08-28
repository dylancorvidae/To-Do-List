const client = require('../../bc-summer-2019-demo/bootcamp-two/11-same-page-data/lib/client');
const types = require('../../bc-summer-2019-demo/bootcamp-two/11-same-page-data/data/types');
const cats = require('../../bc-summer-2019-demo/bootcamp-two/11-same-page-data/data/cats');

client.connect()
    .then(() => {
        // "Promise all" does a parallel execution of async tasks
        return Promise.all(
            types.map(type => {
                return client.query(`
                    INSERT INTO types (name)
                    VALUES ($1)
                    RETURNING *;
                `,
                [type])
                    .then(result => result.rows[0]);
            })
        );
    })
    .then(types => {
        // "Promise all" does a parallel execution of async tasks
        return Promise.all(
            cats.map(cat => {
                const type = types.find(type => {
                    return type.name === cat.type;
                });
                const typeId = type.id;

                return client.query(`
                    INSERT INTO cats (name, type_id, url, year, lives, is_sidekick)
                    VALUES ($1, $2, $3, $4, $5, $6);
                `,
                [cat.name, typeId, cat.url, cat.year, cat.lives, cat.isSidekick]);
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