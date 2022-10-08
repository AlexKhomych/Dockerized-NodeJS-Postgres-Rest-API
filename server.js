const express = require('express');
const { pool } = require('./db');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    insertData("sammy", "green").
        then(res.send(`Adding an entry to fish database\n`));
})

async function insertData(name, color) {
    try {
        const res = await pool.query(
            "INSERT INTO shark (name, color) VALUES ($1, $2)",
            [name, color]
        );
        console.log(`Added a shark with the name ${name}`);
    } catch (error) {
        console.error(error);
    }
    // const name = "sammy";
    // const color = "green";
    // const res = await pool.query(
    //     "TABLE shark"
    // );
    // console.log(res.rows);
    //console.log(`Added a shark with the name ${name}`);
}


app.listen(5000, () => console.log(`Server up on port ${process.env.NODE_PORT}`));