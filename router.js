var Profile = require("./profile.js");
var renderer = require('./renderer.js');
var querystring = require('querystring');

var commonHeaders = {'Content-Type': 'text/html'}

// handle http route get / and  post / i.e home
function home(request, response) {
  // if url == "/" and GET
  if (request.url === "/") {
    if (request.method.toLowerCase() === "get"){
      // show search
      response.writeHead(200, commonHeaders);
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    } else {
      // if url == "/" and POST

      // get the post data from body
      request.on('data', function(postBody) {
        // extract the username
        var query = querystring.parse(postBody.toString());
        response.writeHead(303, {'location': '/' + query.username});
        response.end();
        // redirect to the /:username
      });
      
    }
  }
}

// handle http route get /:username i.e /chalkers
function user(request, response) {
  // if url == "/..."
  var username = request.url.replace("/", "");
  if (username.length > 0) {
    response.writeHead(200, commonHeaders);
    renderer.view('header', {}, response);


    // get the json from treehouse
    var studentProfile = new Profile(username);
      // on "end"
      studentProfile.on("end", function(profileJSON){
        // show profile

        // store the values which we need
        var values = {
          avatarUrl: profileJSON.gravatar_url,
          username: profileJSON.profile_name,
          badges: profileJSON.badges.length,
          javascriptPoints: profileJSON.points.JavaScript
        }

        // simple response
        renderer.view('profile', values, response);
        renderer.view('footer', {}, response);
        response.end();

      });
        
      // on "error"
      studentProfile.on("error", function(error) {
        // show error
        renderer.view('error', {errorMessage: error.message}, response);
        renderer.view('search', {}, response);
        renderer.view('footer', {}, response);
        response.end();
      });
  }
}

module.exports.home = home;
module.exports.user = user;