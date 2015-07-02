// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archives = require('../helpers/archive-helpers');
var crontab = require('node-crontab');



var runReadList = function(){

}

var jobId = crontab.scheduleJob("*/2 * * * *", function(){ //This will call this function every 2 minutes
    archives.readListOfUrls(archives.downloadUrls)
    console.log("Downloaded Sites")
});

