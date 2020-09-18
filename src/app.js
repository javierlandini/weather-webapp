require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// App paths.
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Configure express public path.
app.use(express.static(publicPath));

// Configure templates.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Javier Landini',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is the help of the weather app.',
        name: 'Javier Landini',
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Javier Landini',
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.statusCode = 400;
        return res.send({
            error: 'You must provide an address.',
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if (error) {
            res.statusCode = 500;
            return res.send({
                error,
            });
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                res.statusCode = 500;
                return res.send({
                    error,
                });
            }

            res.send({
                address: req.query.address,
                location: place,
                forecast,
            });
        })
    })
})

app.get('/help/*', (req, res) => {
    res.statusCode = 404;
    res.render('404', {
        title: '404',
        message: 'Help article not found.',
        name: 'Javier Landini',
    });
})

app.get('*', (req, res) => {
    res.statusCode = 404;
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'Javier Landini',
    });
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
})