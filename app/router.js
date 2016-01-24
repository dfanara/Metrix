module.exports = function(app) {
  var controllers = [
    "base.js",
    "status.js"
  ];

  controllers.forEach(function(controller) {
    var temp = require('./controllers/' + controller)(app);
  });
}
