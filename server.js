const express = require('express');
const query = require('./query');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', query.mainPage);

app.get('/sharks', query.getSharks);

app.post('/sharks', query.postShark);

app.get('/sharks/:id', query.getShark);

app.put('/sharks/:id', query.updateShark);


app.listen(process.env.NODE_PORT, () => console.log(`Server up on port ${process.env.NODE_PORT}`));