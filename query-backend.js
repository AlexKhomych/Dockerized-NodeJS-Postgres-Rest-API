const { pool } = require('./db');

async function requestDataJSON(response, query) {
    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            returnNullJSON();
        } else {
            console.log(`Retrived data`);
            response.status(200).json({ result: res.rows });
        }
    })
}

async function postDataJSON(response, query) {
    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            returnNullJSON();
        } else {
            console.log(`Posted data`)
            response.status(200).json({ result: true });
        }
    })
}

async function updateDataJSON(response, query) {
    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            returnNullJSON();
        } else {
            console.log(`Updated data`);
            response.status(200).json({ result: true });
        }
    })
}

async function returnNullJSON(response) {
    response.status(404).json({ result: null });
}

module.exports = {
    returnNullJSON,
    requestDataJSON,
    postDataJSON,
    updateDataJSON,
}