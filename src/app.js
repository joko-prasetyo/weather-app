//Define module for our app, so we can use it later on
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const app = express()


// Define paths for views
const dir = path.join(__dirname, '../public')
const dirViews = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')
app.use(express.static(dir))
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(partialPaths)

// Routing and rendering the pages
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Joko Prasetyo'  
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Joko Prasetyo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Joko Prasetyo',
        message: 'Feel free to read some help tips'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) return res.send({ error })

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) return res.send({ error })

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide search'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Joko Prasetyo'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Joko Prasetyo'
    })
})


// Open the server on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000.')
})