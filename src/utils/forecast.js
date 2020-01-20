const request = require('request');
const forecast = (longtitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/63d7976976d5ec10845dce78c2ae335d/' + latitude + ',' + longtitude + '?units=si'
    request({
        url: url,
        json: true
    }, (error, res) => {
        if (error) {
            callback('No connection.');
        } else if (res.body.code === 400) {
            callback('The given location is invalid');
        } else {
            callback(undefined, res);
        }
    });
}

module.exports = forecast;