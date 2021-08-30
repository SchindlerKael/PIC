const express = require('express');
const cors = require('cors');
const routes = require('./routes');

require('./database');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(8081, () => {
    let data = new Date();
    console.log('Servidor node iniciado em: ' + data);
});