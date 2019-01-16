const express = require('express');
const bodyParser = require('body-parser');

const locationRoutes = require('./routes/location-routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(locationRoutes);

app.listen(3001);
