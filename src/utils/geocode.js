const chalk = require('chalk');
const request = require('postman-request');

const mapBoxKey = 'pk.eyJ1Ijoic3Vzb25zIiwiYSI6ImNrcnplYXA0MzAybGYyd3Bja2t4OWprZ3QifQ.P16SPaKI330JpoIbqTZtWw'

const geocode = (address, callback) => {
  if (!address) return
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapBoxKey}&limit=1`;
  request({ url, json: true }, (error, response, body) => {
    if (error) callback('Unable to connect to web!');
    else if (!body.features) callback('Unable to find data');
    else callback(undefined, { latitude: body?.features[0]?.center[0], longitude: body?.features[0]?.center[1], location: address });
  })
};

module.exports = geocode;