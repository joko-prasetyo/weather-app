const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2fe41b5686dd1786491b765c90ceccd8/'+ latitude + ',' + longitude + '?units=si'
    request({ url, json: true}, (error, { body }) => {
        if (error){
            callback("Sorry something went wrong. There is no internet connection", undefined);
        } else if (body.error){
            callback("No match location found", undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out with approximately the highest and lowest temperature of ${body.daily.data[0].temperatureHigh} and ${body.daily.data[0].temperatureLow} degrees. There's ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast