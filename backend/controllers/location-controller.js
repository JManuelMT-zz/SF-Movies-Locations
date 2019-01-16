const Location = require('../models/Location');
const { getAllLocationsTransfomer, getLatAndLonTransformer } = require('../transformers/location-transformer');


const getLocations = (req, res, next) => {
    const { address } = req.params;

    if (address) {
        Location.getLocation(address)
            .then((responseLocation) => {
                const location = getLatAndLonTransformer(responseLocation.data);
                return res.send(location);
            })
            .catch(error => res.status(500).send(error));
    } else {
        Location.getAllLocations()
            .then((responseLocations) => {
                res.locals.responseLocations = getAllLocationsTransfomer(responseLocations.data);
                next();
            })
            .catch(error => res.status(500).send(error));
    }
};

const getLatitudeAndLongitude = (req, res, next) => {
    // We are getting ten locations coordinates since the beginning to fill the map
    Location.getLocationsLatAndLon(res.locals.responseLocations.slice(0, 10))
        .then((responses) => {
            res.locals.locationsLatAndLog = responses.map(
                location => getLatAndLonTransformer(location.data),
            );
            next();
        })
        .catch(error => res.status(500).send(error));
};

const sendLocations = (req, res) => (
    res.send({
        locationsSFmovies: res.locals.responseLocations,
        locationCoordinates: res.locals.locationsLatAndLog,
    })
);


module.exports = [getLocations, getLatitudeAndLongitude, sendLocations];
