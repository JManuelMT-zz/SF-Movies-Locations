const express = require('express');
const bodyParser = require('body-parser');

const locationRoutes = require('./routes/location-routes');

const port = process.env.PORT || 3001;

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(locationRoutes);

app.listen(port);
