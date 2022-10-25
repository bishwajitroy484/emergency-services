const express = require("express");
const app = express();
require("./connection");
const router = require("./Routes/router");

const port = 3001;

app.use(router);

app.listen(port, () => {
    console.log('Server Start Running in ', port, '...')
});