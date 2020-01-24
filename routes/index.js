const express = require('express');
const router = express.Router();
const forecast = require('../src/utils/forecast.js')
const weatherData = {
  timezone: '',
  temperature: '',
  apparentTemperature: '',
  summary: ''
}



router.get('/', (req, res) => {
  const context = {
    weatherData: weatherData,
    userRequest: req.user
  }
  res.render('index/welcome', context);
});

router.get('/dashboard', (req, res) => {
  res.render('index/dashboard');
});


router.post('/', (req, res) => {
  const lat = req.body.lat;
  const lon = req.body.lon;

  forecast(lon, lat, (err, forecastData) => {
    if (err) {
      console.log('ERROR!!!');
      //console.log(err);
      res.redirect('index/welcome');
    } else {
      //console.log('weather data allocated');
      weatherData.timezone = forecastData.body.timezone;
      weatherData.temperature = forecastData.body.currently.temperature;
      weatherData.apparentTemperature = forecastData.body.currently.apparentTemperature;
      weatherData.summary = forecastData.body.currently.summary;

      //console.log('current tmp:' + weatherData.temperature);
      //console.log('current timezone:' + weatherData.timezone);
      res.redirect('index/welcome');
    }
  })
})


module.exports = router;