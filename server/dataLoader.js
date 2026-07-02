const fs = require("fs");
const path = require("path");

// this variable will hold the car data once it is loaded
let carData = {};

// reads the car_data.json file and stores the result
function loadCarData() {
  const filePath = path.join(__dirname, "car_data.json");

  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      console.log("could not read car_data.json: " + err);
      return;
    }
    carData = JSON.parse(data);
    console.log("car data loaded successfully");
  });
}

// returns the loaded car data so other files can use it
function getCarData() {
  return carData;
}

module.exports = { loadCarData, getCarData };
