const axios = require('axios');
const { dataSFToken, googleApiKey } = require('../../constants/keys');
const { getLatAndLonTransformer, getSFLocationsTransfomer } = require('../transformers/location-transformer');

class Locations {
    static getLocations(address = '') {
        // We obtain first 10 elements at the beginning
        const params = address === '' ? '$limit=9' : `$where=locations like '%25${address}%25'`;
        return axios.get(
            `https://data.sfgov.org/resource/wwmu-gmzc.json?$$app_token=${dataSFToken}&${params}`,
            {
                transformResponse: data => getSFLocationsTransfomer(JSON.parse(data)),
            },
        );
    }

    static getLocationsLatAndLon(locations) {
        // get latitude and longitude of addresses
        const locationPromises = locations.map(
            (location, index) => axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${location.location} San Francisco&key=${googleApiKey}`,
                {
                    transformResponse: data => getLatAndLonTransformer(JSON.parse(data), location, index),
                },
            ),
        );
        return Promise.all(locationPromises);
    }
}

module.exports = Locations;
