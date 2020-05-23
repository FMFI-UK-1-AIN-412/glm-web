var https = require("https");
var http = require("http");

var { config, app } = require("./server");

var port = process.env.PORT || config.port || 9999;

http.createServer(config, app).listen(port, null, function (err) {
  console.log("Gatekeeper, at your service: https://localhost:" + port);
});
