const expressServer = require('express');
const app = expressServer();
const port = 3000;

global.dataSourceInitialised = false;

const rotes = require('./router');
app.use('/', rotes)


app.listen(port, function () {
    console.log('Listening on port 3000!');
});