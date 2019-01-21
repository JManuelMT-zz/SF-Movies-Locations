const express = require('express');
const bodyParser = require('body-parser');

const locationRoutes = require('./routes/location-routes');

const port = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(locationRoutes);

app.listen(port);
