var loghose = require('docker-loghose');
var through = require('through2');
var request = require('request');
var uri = process.env.LOGSTATION_URL;

var opts = {
  json: false, 
  newline: true,
};

loghose(opts).pipe(through.obj(function(chunk, enc, next) {
  request({
    uri: uri,
    json: true,
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(chunk)
  }, function() {});
  next();
}))
