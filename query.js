const { requestDataJSON, postDataJSON, updateDataJSON, returnNullJSON } = require('./query-backend');

/**
* The main page of REST API
*/
const mainPage = (request, response) => {
    response.send("Welcome to this simple REST API :3");
}

/**
* Lists of sharks in the sharks table in JSON format
*/
const getSharks = (request, response) => {
    const query = {
        text: 'SELECT * FROM sharks ORDER BY id ASC',
    }
    requestDataJSON(response, query);
}

/**
* Lists of sharks in the sharks table in JSON format specify id as parameter
*/
const getShark = (request, response) => {
    let id = request.params.id;
    if (id) {
        const query = {
            text: 'SELECT * FROM sharks WHERE id = $1',
            values: [id],
        }
        requestDataJSON(response, query);
    } else {
        returnNullJSON();
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
        returnNullJSON();
    }
}

/**
* Update a shark in JSON format

* You must specify id, name and color fields 
*/
const updateShark = (request, response) => {
    let id = request.params.id;
    let name = request.body.name;
    let color = request.body.color;
    if (id && name && color) {
        const query = {
            text: 'UPDATE sharks SET name = $2, color = $3 WHERE id = $1',
            values: [id, name, color],
        }
        updateDataJSON(response, query);
    }
    else {
        returnNullJSON();
    }
}

module.exports = {
    mainPage,
    getSharks,
    getShark,
    postShark,
    updateShark,
}