const express = require('express');
const app = express();
const port = 3000;


const initDb = require('./structure/db.js');
const process = ( async () => {
    await initDb();
})();

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});