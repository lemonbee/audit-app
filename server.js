var express = require('express');
var request = require('request');

var app = express();
app.use('/data', function(req, res) {
  var url = "http://localhost:8099/Audit/api/v1.0/job";
  req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 4000);