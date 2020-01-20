const request = require('request');
const reverseGeocode = (longitude, latitude, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        longitude + ',' + latitude + ".json?access_token=pk.eyJ1IjoibWFzb24temgiLCJhIjoiY2s1YjFzamM1MDYwZTNqbXNhbGNsbXhycyJ9.eGRTN6YEx8EwynNFQv7pag&limit=1";

    request({
        url: url,
        json: true
    }, (err, res) => {
        if (error) {
            callback("unable to connect");
        } else if (response.body.features.length === 0) {
            callback("unable to find location.");
        } else {
            console.log('found location via reverse geocode: ' + response.body.features[0].place_name);

            callback(undefined, {
                place_name: response.body.features[0].place_name
            });
        }
    });
}

module.exports = reverseGeocode;