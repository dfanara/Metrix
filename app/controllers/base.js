module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send("Anonymous metrics for plugins by <a href='https://www.spigotmc.org/resources/authors/shadowwolf97.17314/'>Shadowwolf97</a>.");
  });

  app.post('/updates/:plugin', function(req, res) {
    if(req.headers["user-agent"] !== "ShdwlfMetrics/1.0") {
      res.status(403).send();
      return;
    }

    if(
      !app.utils.verifyUUID(req.body.uuid) ||
      !req.body.online
    ) {
      res.status(400).send();
      return;
    }

    if(req.params['plugin'] == "Boom") {
      if(app.utils.checkCache(app, req.body.uuid)) {
        app.db.collection('boom.metrics', function(err, collection) {
          if(err) {
            console.log(err);
          }else {
            collection.insert({
              'uuid': req.body.uuid,
              'online': req.body.online,
              'country': req.country.name,
              'time': app.utils.roundedTimestamp(),
              'detonated': req.body.detonated,
              'registered': req.body.registered,
              'ip': req._ip,
              'version': req.body.version,
              'auth': req.body.auth,
              'bukkit': req.body.bukkit,
              'osname': req.body.osname,
              'osversion': req.body.osversion,
              'osarch': req.body.osarch,
              'jversion': req.body.jversion,
              'cores': req.body.cores
            });
            res.status(200).send();
          }
        });
      }else {
        res.status(429).send();
        return;
      }
    }
  });
}
