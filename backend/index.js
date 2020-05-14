var https = require("https");
var http = require("http");

var { config, app } = require("./server");

var port = process.env.PORT || config.port || 9999;

https.createServer(config, app).listen(9998);
http.createServer(config, app).listen(9999);

// app.listen(port, null, function (err) {
//   console.log('Gatekeeper, at your service: http://localhost:' + port);
// });
