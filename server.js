// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./public/lib/client');

// Database Client
client.connect();

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // enable serving files from public
app.use(express.json()); // enable reading incoming json data

app.get('/api/tasks', (req, res) => {
    const showAll = (req.query.show && req.query.show.toLowerCase() === 'all');
    const where = showAll ? '' : 'WHERE completed = FALSE';
    
    client.query(`
        SELECT
            id,
            name,
            completed
        FROM tasks
        ${where}
        ORDER BY name;
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });   
});

app.post('/api/tasks', (req, res) => {
    const task = req.body;
    console.log('server', task);
    client.query(`
        INSERT INTO tasks (name)
        VALUES ($1)
        RETURNING *;
    `,
    [task.name]
    )
        .then(result => {
            console.log(result);
            
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Task "${task.name}" already exists`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

app.put('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = req.body;

    client.query(`
        UPDATE      tasks
        SET         name = $2,
                    completed = $3
        WHERE       id = $1
        RETURNING   *;
    `,
    [id, task.name, task.completed]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Task "${task.name}" already exists`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id;

    client.query(`
        DELETE FROM tasks
        WHERE  id = $1
        RETURNING *;
    `,
    [id]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23503') {
                res.status(400).json({
                    error: `Could not remove, task is already present. Make complete or delete all tasks with that name first.`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});