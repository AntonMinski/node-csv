const expressServer = require('express');
const app = expressServer();
const port = 3000;

const baseRouter = require('./structure/product/router');
app.use('/', baseRouter)


app.listen(port, function () {
    console.log('Listening on port 3000!');
});