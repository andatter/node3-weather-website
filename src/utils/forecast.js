const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fec1cdb2e5b0244d6846e4c1e5f3f13b&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find weather for that location. Try another search.', undefined)
        } else {
            const { temperature, feelslike, weather_descriptions, humidity } = body.current
            callback(undefined, {
                data: 'The weather is ' + weather_descriptions[ 0 ].toLowerCase() + '. It is currently ' + temperature + ' degrees. It feels like ' + feelslike + ' degrees. The humidity is ' + humidity + '%.'
            })
        }
    })
}

module.exports = forecast