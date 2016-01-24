var express = require('express');
var bodyParser = require('body-parser');
var config = require('./app/config.json');

var app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  if(!app.db) {
    res.status(503).send("The service is still loading. please wait.");
    return;
  }

  if(req.headers['cf-ipcountry']) {
    req.country = {
      'code': req.headers['cf-ipcountry'],
      'name': app.countries[req.headers['cf-ipcountry']]
    }
  }else {
    req.country = {
      'code': '',
      'name': 'Unknown'
    }
  }

  console.log(req.headers);
  if(req.headers['cf-connecting-ip']) {
    req._ip = req.headers['cf-connecting-ip'];
  }else {
    req._ip = req.ip;
  }

  console.log("[" + app.utils.friendlyTimestamp() + "] " + req.path + " " + req.method + " " + req._ip);

  next();
});

app.mongoClient = require('mongodb').MongoClient;
app.mongoClient.connect(config.mongo.host, function(err, db) {
  if(err) {
    console.log("Error connecting to mongo: " + err);
  }else {
    console.log("[DB] MongoDB Loaded.");
    app.db = db;
  }
});
app.started = Date.now();

console.log("[Web] Booting Web.")
app.listen(80);

app.utils = require('./app/utils.js');
app.countries = require('./app/countries.json');
app.cache = {};

//Setup Routes
require('./app/router.js')(app);
