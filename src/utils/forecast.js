const request = require('postman-request')

const getForecast = (lat,lng,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=635993e5e1d21d41eb470cc996d42ab4&query=' + lat + ',' + lng + '&units=f'

    request({ url, json: true },(error,response) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(response.body.error){
            callback('Unable to find location!',undefined)
        }else{
            callback(undefined,{
                location: response.body.location.name,
                currently: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelsLike: response.body.current.feelslike,
                humidity: response.body.current.humidity
            })
        }
    })
}

module.exports = getForecast

// Using location Name
// const getForecast = (location,callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=635993e5e1d21d41eb470cc996d42ab4&query=' + encodeURIComponent(location) + '&units=f'

//     request({ url: url, json: true },(error,response) => {
//         if(error){
//             callback('Unable to connect to weather service!',undefined)
//         }else if(response.body.error){
//             callback('Unable to find location!',undefined)
//         }else{
//             callback(undefined,{
//                 location: response.body.location.name,
//                 currently: response.body.current.weather_descriptions[0],
//                 temperature: response.body.current.temperature,
//                 feelsLike: response.body.current.feelslike
//             })
//         }
//     })
// }