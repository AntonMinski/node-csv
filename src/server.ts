const expressServer = require('express');
const app = expressServer();
const port = 3000;

const rotes = require('./controllers/products.controller');
app.use('/', rotes)


app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
});