var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var path = require('path');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var uri = url.parse(req.url).pathname;
  var fileName = path.join(process.cwd(), "web/public/" + uri);
  //fileName = fileName + 'web/public/'
  console.log(uri)
  console.log(fileName)

  fs.exists(fileName, function(exists){
    if(!exists){
      res.writeHead(404, {"content-type": "text/plain"})
      res.write("404 not found\n")
      res.end()
      return
    }

    if(fs.statSync(fileName).isDirectory()){
      fileName += "index.html";
    }

    fs.readFile(fileName, "binary", function(err, file){
      if(err){
        res.writeHead(500, {"content-type": "text/plain"})
        res.write(err + "\n");
        res.end();
        return
      }

      res.writeHead(200);
      res.write(file, "binary");
      res.end();


    })

  })

};
