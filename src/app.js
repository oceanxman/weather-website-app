const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

const app = express()
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>
    res.render('index', {
        title: 'Weather-MAN Forecast',
        name: 'Ethan'
    })
)

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About the Site",
        name: 'The Swag Miester'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Hahah, YOU need help!",
        msg: 'Suck it, you aint getting no help!',
        name: "Natagora-san"

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an Address"
        })
    } else {
        geocode(req.query.address, (error, { coord, location } = {}) => {
            if (error) {
                return res.send({
                    error
                });
            }

            forecast(coord, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    });
                }
                res.send({
                    location,
                    forecastData

                })
                // console.log(location);
                // console.log(forecastData);
            });
        });
    }



    // res.send([{
    //     location: "Pen Island",
    //     forecast: "Its raining men, Hallejuah",
    //     address: req.query.address
    // }])
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"

        })
    }
    res.send({
        products: []
    })


})

app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        title: '404',
        name: "'Very, very, helpful people'",
        msg: " Help article not found"
    })
})

//404 setup, must be last
app.get('*', (req, res) => {
    res.render('errorPage', {
        title: "404",
        name: "Ghosts",
        msg: "Page not found!"
    })
})

// app.com
// app.com/help
// app.com/about 

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})