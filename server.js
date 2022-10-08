const e = require('express');
const express = require('express');
const { pool } = require('./db');
require('dotenv').config();

const app = express();

app.get('/', (request, response) => {
    insertData(response);
})

app.get('/sharks', (request, response) => {
    let id = request.query.id;
    if (id) {
        requestDataById(response, "shark", id);
    } else {
        requestData(response, "shark");
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

async function insertData(response) {
    const query = {
        text: "INSERT INTO shark (name, color) VALUES ($1, $2)",
        values: ["sammy", "green"],
    }
    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            response.status(404).json({ result: false });
        } else {
            console.log(`Added a shark with the name sammy`);
            response.status(200).json({ result: true });
        }
    });
}

app.listen(process.env.NODE_PORT, () => console.log(`Server up on port ${process.env.NODE_PORT}`));