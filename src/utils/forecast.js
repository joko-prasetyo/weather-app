const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2fe41b5686dd1786491b765c90ceccd8/'+ latitude + ',' + longitude
    request({ url, json: true}, (error, { body }) => {
        if (error){
            callback("Sorry something went wrong. There is no internet connection", undefined);
        } else if (body.error){
            callback("No match location found", undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There's ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast