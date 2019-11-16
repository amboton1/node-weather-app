const path = require("path");
const express = require("express");
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ammar Botonjic'
  });
})

app.get("/about", (req, res) => {
  res.render('about', {
    title: 'About Page',
    description: 'This is about page',
    name: 'Ammar Botonjic'
  })
})

app.get("/help", (req, res) => {
  res.render('help', {
    title: 'Help Page',
    description: 'We are here to help you',
    name: 'Ammar Botonjic'
  })
})

app.get("/weather", (req, res) => {
  
  if (!req.query.address) {
    return res.send({
      error: 'There is no address'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    })
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    page: 'Help article not found',
    name: 'Ammar Botonjic'
  });
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    page: 'Page not found',
    name: 'Ammar Botonjic'
  });
})

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
