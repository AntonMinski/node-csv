const express = require('express');
const app = express();
const port = 3000;

const router = require('./structure/product/router.js');
const db = require('./structure/db.js');
const initDb = ( async () => {
    const sequelizeData = await db();
    app.use('/', router(sequelizeData))
})();

app.listen(port, function () {
    console.log('Listening on port 3000!');
});