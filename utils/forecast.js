const request = require("request");
const forecast = (coord, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=486f04f240a8f4ab5bbc7f461c360967&query=" +
    coord[1] +
    "," +
    coord[0] +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out."
      );
    }
  });
};
module.exports = forecast;
