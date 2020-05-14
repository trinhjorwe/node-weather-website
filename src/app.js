const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')//allows you to set a value
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Joe'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Joe'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        message: 'Need help?',
        name:'Joe'
    })
})

// app.get('/google', (req, res) => {
//     res.render('google', {
//         message: 'Need help?'
//     })
// })


app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'Please enter an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Joe',
        errorMessage: 'Help article not found'
    }) // catch all for all help 404s
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Jorwe',
        errorMessage:'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) //starts up a server, stays up and running as long as we let it.

