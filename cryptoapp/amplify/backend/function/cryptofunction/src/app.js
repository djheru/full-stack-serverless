var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const axios = require("axios");

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/coins", function (req, res) {
  const { apiGateway: { event: { queryStringParameters: params } } = {} } = req;
  const start = params && params.start ? params.start : 0;
  const limit = params && params.limit ? params.limit : 10;
  const apiUrl = "https://api.coinlore.com/api/tickers";
  const queryString = `start=${start}&limit=${limit}`;
  axios
    .get(`${apiUrl}?${queryString}`)
    .then((response) => res.json({ coins: response.data.data }))
    .catch((error) => res.json({ error }));
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
