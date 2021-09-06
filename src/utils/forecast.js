const chalk = require('chalk');
const request = require('postman-request');

const link = 'http://api.weatherstack.com/current';
const key = '3b07173c7582f8d31549096c228fb147';
const query = 'query=Riga&units=f'


const forecast = (lat, lon, callback) => {
  const url = `${link}?access_key=${key}&query=${lat},${lon}`;
  request({ url, json: true }, (error, response, body) => {
    if (error) callback('Unable to connect to web!');
    else if (body.success === false) callback('Something went wrong, unable to get data');
    else callback(undefined, { weather: body.current.weather_descriptions[0] });
  })
};

module.exports = forecast;