var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var path = require('path');
// require more modules/folders here!

var requestMethods = {
  GET: function(req, res){
    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(), "web/public/" + uri);

    if(!(uri === "/") && !(uri === "/styles.css") && !(uri === "/loading.html")){
      fileName = path.join(process.cwd(), "archives/sites/" + uri);
    }


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
      },
    POST: function(req, res){
      var uri = url.parse(req.url).pathname;
      var fileName = path.join(process.cwd(), "web/public/" + uri);
      var data = "";


      fileName = path.join(process.cwd(), "archives/sites/" + uri);


      req.on("data", function(chunk){
        data += chunk;
      })
      req.on("end", function(){

      archive.addUrlToList(data.slice(4)+'\n');
      console.log(fileName + data.slice(4))
      fs.exists(fileName + data.slice(4) , function(exists){
        if(!exists){
          console.log("PAge does not exist. Redirecting to loading.html")
          res.writeHead(302, {Location: "./loading.html"});
          res.end();
        }else {
          res.writeHead(302, {Location: ("./" + data.slice(4))});
          res.end();

        }
      })
      })
    },
    OPTIONS: function(req, res){

    }
}

exports.handleRequest = function (req, res) {
  requestMethods[req.method](req, res);

};
