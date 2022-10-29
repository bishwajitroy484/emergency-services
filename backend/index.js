const express = require("express");
const bodyParser = require('body-parser')
const app = express();
require("./connection");
const router = require("./Routes/router");

const port = 3001;

// app.use(router);
// app.use(bodyParser.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router);

app.listen(port, () => {
    console.log('Server Start Running in ', port, '...')
});