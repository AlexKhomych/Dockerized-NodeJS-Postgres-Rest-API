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
        requestDataById(response, "shark", id);
    } else {
        requestData(response, "shark");
    }
})

app.post('/sharks', (request, response) => {
    let name = request.body.name;
    let color = request.body.color;
    if(name && color){
        insertData(response, name, color);
    }else{
        response.status(404).json({result: null});
    }
})

async function requestData(response, table) {
    const query = {
        text: `SELECT * FROM ${table}`,
    };
    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            response.status(404).json({ result: null })
        } else {
            console.log(`Retrived data from shark`);
            response.status(200).json({ result: res.rows })
        }
    });
}

async function requestDataById(response, table, id) {
    const query = {
        text: `SELECT * FROM ${table} WHERE id = $1;`,
        values: [id],
    };
    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            response.status(404).json({ result: null })
        } else {
            console.log(`Retrived data from shark by id`);
            response.status(200).json({ result: res.rows })
        }
    });
}

async function insertData(response, name, color) {
    const query = {
        text: "INSERT INTO shark (name, color) VALUES ($1, $2)",
        values: [name, color],
    }
    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            response.status(404).json({ result: null });
        } else {
            console.log(`Added a shark with the name ${name}`);
            response.status(200).json({ result: true });
        }
    });
}

app.listen(process.env.NODE_PORT, () => console.log(`Server up on port ${process.env.NODE_PORT}`));