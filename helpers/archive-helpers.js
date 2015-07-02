var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths["list"], function(error, data){
    if(error){
      throw error;
    }else{
      callback(data.toString().split("\n"))
    }
  })
};

exports.isUrlInList = function(url, callback){

  exports.readListOfUrls(function(urls){
    if(urls.indexOf(url) !== -1){
      callback(true)
    } else{

      callback(false)
    }

  })

};

exports.addUrlToList = function(data, callback){
  fs.appendFile(exports.paths["list"], data, callback)
};

exports.isUrlArchived = function(site, callback){
  fs.exists(exports.paths["archivedSites"] + site, callback);
};

exports.downloadUrls = function(urlArray){
  // console.log(http.get.toString())
  for(var i = 0; i < urlArray.length; i++){
    request("http://" + urlArray[i]).pipe(fs.createWriteStream(exports.paths["archivedSites"] +"/"+ urlArray[i] ));
  }
  //console.log(exports.paths['archivedSites'] + "/www.yahoo.com")






};
