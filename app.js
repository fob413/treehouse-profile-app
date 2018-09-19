// Problem: we need a simple way to look at a user's badge count and javascript points from a web browser
// Solution: use nodejs to perform the profile look ups and serve our templates via http

// create a web server
const http = require('http');
var router = require("./router.js");

http.createServer(function (request, response) {
  router.home(request, response);
  router.user(request, response);
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');

