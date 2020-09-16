const request = require('postman-request');

const geocode = (location, callback) => {
    const maps_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(location) + ".json?access_token=" + process.env.GEOCODE_API_KEY + "&limit=1";
    request({uri: maps_url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to geocoding API.');
            return;
        }
        if (body.message) {
            callback('There has been an error in the geocoding API response: ' + body.message);
            return;
        }
        if (!body.features.length) {
            callback('Place not found.');
            return;
        }
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            place: body.features[0].place_name,
        });
    });
}

module.exports = geocode;