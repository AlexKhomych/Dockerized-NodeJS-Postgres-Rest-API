const { requestDataJSON, postDataJSON, updateDataJSON } = require('./query-backend');

/**
* The main page of REST API
*/
const mainPage = (request, response) => {
    response.send("Welcome to this simple REST API :3");
}

/**
* Lists of sharks in the sharks table in JSON format

* OPTIONALLY you may specify id in the query to get specific shark
*/
const getSharks = (request, response) => {
    let id = request.query.id;
    if (id) {
        const query = {
            text: 'SELECT * FROM sharks WHERE id = $1',
            values: [id],
        }
        requestDataJSON(response, query);
    } else {
        const query = {
            text: 'SELECT * FROM sharks ORDER BY id ASC',
        }
        requestDataJSON(response, query);
    }
}

/**
* Post a shark to the sharks table in JSON format

* You must satisfy name and color fields 
*/
const postShark = (request, response) => {
    let name = request.body.name;
    let color = request.body.color;
    if (name && color) {
        const query = {
            text: 'INSERT INTO sharks (name, color) VALUES ($1, $2)',
            values: [name, color],
        }
        postDataJSON(response, query);
    } else {
        response.status(404).json({ result: null });
    }
}

/**
* Update a shark in JSON format

* You must specify id, name and color fields 
*/
const updateShark = (request, response) => {
    let id = request.body.id;
    let name = request.body.name;
    let color = request.body.color;
    if (name && color) {
        const query = {
            text: 'UPDATE sharks SET name = $2, color = $3 WHERE id = $1',
            values: [id, name, color],
        }
        updateDataJSON(response, query);
    } else {
        response.status(404).json({ result: null });
    }
}

module.exports = {
    mainPage,
    getSharks,
    postShark,
    updateShark,
}