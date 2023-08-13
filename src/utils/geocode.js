const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kYXR0ZXIiLCJhIjoiY2xsNDd6a2VnMDQ1MTNrbXF0M3F4ZmxiYiJ9.rFlSNbboyG40KFpz_Q4Qfg&limit=1'

    request({ url: url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const { place_name: location, center: center } = body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: location
            })
        }
    })
}

module.exports = geocode