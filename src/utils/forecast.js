const request = require('request')

const forecast = (lat, long, callback) => {
    if(isNaN(lat) || isNaN(long)) {
        const error = 'Lat or Long must be a number' 
        return callback(error, undefined)
    }
    var lat = lat.toString()
    var long = long.toString()
    const url = 'http://api.weatherstack.com/current?access_key=e3fc6c073873eeba2d6f55bd800d01e8&query=' + lat + ',' + long + '&units=f'
    console.log(url)
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unexpected error', undefined)
        } else {
            callback(undefined, {
                actualTemp: response.body.current.temperature,
                feelsLike: response.body.current.feelslike
            })
        }
    })

}

module.exports = forecast