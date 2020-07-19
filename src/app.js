// Core module
const path = require('path')
const request = require('postman-request')
// npm module express ----> npm i express
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express()
// Setting up port value 3000 if running the app locally or the value provide by Heroku via process.env.PORT
const port = process.env.PORT || 3000

// configure server and define paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

// Setup handlebars and view directory
app.set('views',viewsPath)
app.set('view engine','hbs')

// localhost:3000 will serve the index.html if not using handlebars
// Setup static directory
app.use(express.static(publicDirectoryPath))

// Base route
// Render the handlebars index.hbs view located in views folder
app.get('', (req,res) => {
    res.render('index',{
        title:"Weather App",
        name: "Jatinder Virdi"
    })
})

// Help page for example
// app.com/help

app.get('/help',(req,res) => {
    res.render("help",{
        title:"Help",
        name:"Jatinder Virdi",
        message:"Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus."
    })
})

// About page
app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Page',
        name:'Jatinder Virdi'
    })
})

// Weather page
app.get('/weather',(req,res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'Please provide the location'
        })
    }
    geocode(req.query.address,(error,{location,lat,lng}={}) => {
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(lat,lng,(error,{currently,temperature,feelsLike,humidity}) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                "location":location,
                "weather":`It is currently ${currently} with an actual temperature of ${temperature} degrees and a real feel temperature of ${feelsLike} degrees.Humidity is ${humidity}%.`
            })
        
            // console.log(chalk.yellow(location));
            // console.log(`It is ${currently}. Actual temperature is ${chalk.green(temperature)} degrees with a real feel temperature of ${chalk.red(feelsLike)} degrees.`);
        })
    })

    // res.send({
    //     "location":req.query.address,
    //     "Weather":"Sunny sky."
    // })
})

app.get('/products',(req,res) => {
    console.log(req.query)
    if(!req.query.product){
        return res.send({
            error:'Please provide the product to search for.'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('page404',{
        title:'Error 404',
        message:'Help article not found!',
        name:'Jatinder Virdi'
    })
})

app.get('*',(req,res) => {
    res.render('page404',{
        title:'Error 404',
        message:'Page Not Found!',
        name:'Jatinder Virdi'
    })
})
// set up the server. First argument is the port. Second arg is the callback function when the server is up and running
app.listen(port,() => {
    console.log(`Server is running and application is listening at http://localhost:${port}...`)
})