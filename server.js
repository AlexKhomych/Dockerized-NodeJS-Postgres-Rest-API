const express = require('express');
const query = require('./query');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', query.mainPage);

app.get('/sharks', query.getSharks);

app.post('/sharks', query.postShark);

app.put('/sharks', query.updateShark);


app.listen(process.env.NODE_PORT, () => console.log(`Server up on port ${process.env.NODE_PORT}`));