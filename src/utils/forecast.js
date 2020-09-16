const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const baseurl = "http://api.weatherstack.com/current";
    const api_key = process.env.FORECAST_API_KEY;
    const query = lat + "," + long;
    const uri = baseurl + '?access_key=' + api_key + '&query=' + query;
    request({uri, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to forecast API.');
            return;
        }
        if (body.error) {
            callback('There has been an error in the forecast API response: ' + body.error.info);
            return;
        }
        const msg = body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. And it feels like " + body.current.feelslike + " degress.";
        callback(undefined, msg);
    })    
}

module.exports = forecast;