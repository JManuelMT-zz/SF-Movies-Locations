// Tranform apis data to get the structure that we want

const getError = require('../utils/getError');

exports.getSFLocationsTransfomer = (locations) => {
    if (locations === undefined || locations.length < 1) {
        return getError();
    }
    return locations.map(location => ({
        mainActor: location.actor_1,
        location: location.locations,
        company: location.production_company,
        releaseYear: location.release_year,
        writers: location.writer,
    }));
};

exports.getLatAndLonTransformer = (location, locationSF) => {
    if (location === undefined) {
        return getError();
    }

    return {
        lat: location.results[0].geometry.location.lat,
        lng: location.results[0].geometry.location.lng,
        location: locationSF.location,
        mainActor: locationSF.mainActor,
        company: locationSF.company,
        releaseYear: locationSF.releaseYear,
        writers: locationSF.writers,
    };
};
