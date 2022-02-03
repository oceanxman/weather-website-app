const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZWhiYXJyZWxwcm9vZiIsImEiOiJja3oyeDR3NXQwMTV1MnZwODRzZHdkcTF1In0.RTuZX8uqscI2VZPIQPo4aQ&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find loction. Try another search", undefined);
    } else {
      callback(undefined, {
        coord: body.features[0].center,
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
