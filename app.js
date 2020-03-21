// jshint esversion: 6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

// Necessary code to allow us to parse the body of the post requests
app.use(bodyParser.urlencoded({extended: true}));

// Allowing Express to use out statis files such as our CSS
app.use(express.static(__dirname));

// Load homepage
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Handle POST requests
app.post("/", function(req, res){

    // Send the user back to the index page
    // res.sendFile(__dirname + "/index.html");

    // Save the data retrievied
    const city = req.body.city;
    const countryCode = req.body.countryCode;
    const apiKey = "65f9a7d19d696daedef04dddb3f653ce";
    const units = "metric";

    // Weather API URL
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + countryCode + "&APPID=" + apiKey + "&units=" + units;

    // Get the data from the url
    https.get(url, function(response) {

        // Search for specific data
        response.on("data", function(data) {

          // Parse the data into a JSON
          const weatherData = JSON.parse(data);

          // Retrieve the particular & arbitrary data
          const city = weatherData.name;
          const country = weatherData.sys.country;
          const icon = weatherData.weather[0].icon;
          const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
          const dscrp = weatherData.weather[0].description;
          const temp = weatherData.main.temp;

          res.write("<h1>Currently, the weather in " + city + ", " + country + ":</h1>");
          res.write("<p>" + dscrp + ". The temperature is " + temp +  " degree Celsius</p>");
          res.write("<img src=" + imageURL + ">");
          res.send();
        });
    });
});


// Print a message when the server starts
app.listen(4000, function() {
  console.log("Server started on port 4000.");
});
