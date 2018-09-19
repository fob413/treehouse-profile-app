// function that handles the reading of files and merge in values
  // read from file and get a string
    // merge values into string
var fs = require('fs');

function mergeValues(values, content) {
  // cycle over the keys
  for (var key in values) {
    // replace all {{key}} with the value from the values object

    content = content.replace("{{" + key + "}}", values[key]);
  }
  // return merged content
  return content;
}

function view(templateName, values, response) {
  // read from the template files
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});

  // insert values into the content
  fileContents = mergeValues(values, fileContents);

  // write out the contents to the response
  response.write(fileContents);
}


module.exports.view = view;