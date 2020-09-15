const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

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
    const data = {
        location: "Rosario, Santa Fe, Argentina",
        forecast: "It'sunny. It's 26 degress and it feels like 27 degress.",
    }
    res.send(data);
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

app.listen(3000, () => {
    console.log('Server started...')
})