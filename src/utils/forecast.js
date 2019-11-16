const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/695f809c8e99e8412684d617e86407a0/' + lat + ',' + long;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services.', undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast