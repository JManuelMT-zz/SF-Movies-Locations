const axios = require('axios');
const { dataSFToken, googleApiKey } = require('../../constants/keys');

class Locations {
    static getAllLocations() {
        // get all addresses
        return axios.get(`https://data.sfgov.org/resource/wwmu-gmzc.json?$$app_token=${dataSFToken}`);
    }

    static getLocation(address) {
        // Get an specific location
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleApiKey}`);
    }

    static getLocationsLatAndLon(locations) {
        // get latitude and longitude of addresses
        const locationPromises = locations.map(location => axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.location}&key=${googleApiKey}`));
        return Promise.all(locationPromises);
    }
}

module.exports = Locations;
