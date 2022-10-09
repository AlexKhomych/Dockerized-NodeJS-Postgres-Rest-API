const express = require('express');
const { pool } = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json())

app.get('/', (request, response) => {
    response.send("Welcome to this simple REST API :3");
})

app.get('/sharks', (request, response) => {
    let id = request.query.id;
    if (id) {
        getSharkById(response, id);
    } else {
        getSharks(response);
    }
})

app.post('/sharks', (request, response) => {
    let name = request.body.name;
    let color = request.body.color;
    if (name && color) {
        postShark(response, name, color);
    } else {
        response.status(404).json({ result: null });
    }
})

async function getSharks(response) {
    const query = {
        text: 'SELECT * FROM sharks',
    };
    requestDataJSON(response, query);
}

async function getSharkById(response, id) {
    const query = {
        text: 'SELECT * FROM sharks WHERE id = $1',
        values: [id],
    };
    requestDataJSON(response, query);
}

async function postShark(response, name, color) {
    const query = {
        text: 'INSERT INTO sharks (name, color) VALUES ($1, $2)',
        values: [name, color],
    }
    postDataJSON(response, query);
}

async function requestDataJSON(response, query) {
    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            response.status(404).json({ result: null })
        } else {
            console.log(`Retrived data`);
            response.status(200).json({ result: res.rows })
        }
    });
}

async function postDataJSON(response, query) {
    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            response.status(404).json({ result: null });
        } else {
            console.log(`Posted data`);
            response.status(200).json({ result: true });
        }
    });
}

app.listen(process.env.NODE_PORT, () => console.log(`Server up on port ${process.env.NODE_PORT}`));