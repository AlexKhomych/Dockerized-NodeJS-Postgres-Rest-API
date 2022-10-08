const express = require('express');
const { pool } = require('./db');
require('dotenv').config();

const app = express();

app.get('/', (request, response) => {
    const query = {
        text: "INSERT INTO shark (name, color) VALUES ($1, $2);",
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
})

app.get('/sharks', (request, response) => {
    pool.query("TABLE shark;", (err, res) => {
        if (err) {
            console.error(err);
            response.status(404).json({ result: null })
        } else {
            console.log(`Retrived data from shark`);
            response.status(200).json({ result: res.rows })
        }
    });
})


app.listen(process.env.NODE_PORT, () => console.log(`Server up on port ${process.env.NODE_PORT}`));