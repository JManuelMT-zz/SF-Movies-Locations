// Tranform apis data to get always the same structure

const getError = require('../utils/getError');

exports.getAllLocationsTransfomer = (locations) => {
    if (locations === undefined || locations.length < 1) {
        return getError();
    }
    return locations.map(location => ({
        mainActor: location.actor_1,
        location: location.locations,
        company: location.product_company,
        releaseYear: location.release_year,
        writers: location.writer,
    }));
};

exports.getLatAndLonTransformer = (location) => {
    if (location === undefined) {
        return getError();
    }
    return {
        address: location.results[0].formatted_address,
        lat: location.results[0].geometry.location.lat,
        lng: location.results[0].geometry.location.lng,
    };
};
