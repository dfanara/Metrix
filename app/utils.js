module.exports = {}

module.exports.verifyUUID = function(uuid) {
  var reg = new RegExp("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}");
  return reg.test(uuid);
}

module.exports.roundedTimestamp = function() {
  var coeff = 1000 * 60 * 10;
  var date = new Date();
  var rounded = new Date(Math.floor(date.getTime() / coeff) * coeff);
  return Math.round(rounded.getTime());
}

module.exports.checkCache = function(app, uuid) {
  if(app.cache[uuid] && app.cache[uuid] == module.exports.roundedTimestamp()) {
    return false;
  }else {
    app.cache[uuid] = module.exports.roundedTimestamp();
    return true;
  }
}

module.exports.friendlyTimestamp= function() {
  var time = (new Date() + "").split(" ");
  time.splice(5);
  var t = "";
  for(var i = 0; i < time.length; i++) {
    t = t + time[i] + " ";
  }
  return t.trim();
}
