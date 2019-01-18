const Location = require('../models/Location');

const getLocations = (req, res, next) => {
    Location.getLocations(req.params.address)
        .then((responseLocations) => {
            res.locals.responseLocations = responseLocations.data;
            next();
        })
        .catch(error => res.status(500).send(error));
};

const getLatitudeAndLongitude = (req, res, next) => {
    // We are getting some locations coordinates since the beginning to fill the map
    Location.getLocationsLatAndLon(res.locals.responseLocations)
        .then((responses) => {
            res.locals.locationsLatAndLog = responses.map(
                location => location.data,
            );
            next();
        })
        .catch(error => res.status(500).send(error));
};

const sendLocations = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed

    return res.send({
        locations: res.locals.locationsLatAndLog,
    });
};


module.exports = [getLocations, getLatitudeAndLongitude, sendLocations];
