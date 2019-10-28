const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWR3amhuZiIsImEiOiJjazI3NXdwc2gzOWNqM2NtdHUyYnJ6d2hnIn0.ye3EFftbVJ9snCTqEttlMg'
    request({ url, json: true}, (error, { body }) => {
        if (error){
            callback("Sorry something went wrong. There is no internet connection", undefined);
        } else if (!body.features.length){
            callback("No match location found", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name   
            })
        }
    })
}


module.exports = geocode