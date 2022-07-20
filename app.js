const express = require('express');
const app = express();
const routes = require('./routes/route')

app.use(express.json());
app.use(express.urlencoded());
app.use('/', routes)

app.listen(80, () => {
    console.log("Server startred at localhost");
})