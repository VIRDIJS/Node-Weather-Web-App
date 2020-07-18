const request = require('postman-request');

const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamF0aW5kZXIwMDEiLCJhIjoiY2tjbTVyankzMWZpZjJ5bzIzMnd2aHFiYSJ9.NnRxib_LymLxtYiY7Jvhqw&limit=1'
    // Make a request
    // To use shorthand property replace url:url with url
    request({ url,json:true},(error,response) => {
        if (error){
            callback('Unable to connect to location service!',undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location. Try another search',undefined)
        } else {
            callback(undefined,{
                location: response.body.features[0].place_name,
                lng: response.body.features[0].center[0],
                lat:response.body.features[0].center[1]
            })
        }
    })
}

module.exports = geoCode