const express = require('express');
const app = express();
const port = 3000;

const router = require('./structure/product/router.js');
app.use('/', router)

app.listen(port, function () {
    console.log('Listening on port 3000!');
});