const path = require('path');
const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


// console.log(__dirname)
// console.log(path.join(__dirname, '../public/index.html'))

const app = express();
const port = process.env.PORT || 3000;

//& Define path for config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//& setup handlebars and views config
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//& setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    footerText: 'This is a footer',
    title: 'Main page!',
    name: 'Me me me'
  });
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'You must provide a search term'
    })
    return;
  }

  res.send({
    products: [],
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({ error: 'address must be provided' });
    return;
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) res.send({ error });
    else forecast(latitude, longitude, (error, data) => {
      if (error) res.send({ error });
      else res.send({
        forecast: data.weather,
        location,
        address: req.query.address,
      })
    });
  })

  
  // res.send({
  //   forecast: '',
  //   location: '',
  //   address: req.query.adress,
  // })
})

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'My name is my name',
    footerText: 'This is a footer',
    title: 'About page',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    footerText: 'This is a footer',
    title: 'Help',
    name: 'Me me me me',
    help: 'Jard work',
    helpText: 'Be a man and do it!'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    error: 'Document not found'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    error: 'Page not found!'
  });
});

app.listen(port, () => {
  console.log(chalk.inverse.green('Server running on port 3000.'))
});

