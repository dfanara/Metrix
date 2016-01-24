module.exports = function(app) {
  app.get('/status', function(req, res) {
    res.json({
      "uptime": Math.round((Date.now() - app.started) / 1000),
      "started": Math.round(app.started)
    })
  });
}
