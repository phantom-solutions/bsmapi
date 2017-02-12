var chalk = require('chalk');
var request = require('request');
var fs = require('fs')
var path = require( 'path' );
var process = require( "process" );
var express = require('express');
var saimin = express();
var config = require('./storage/config.json');
const crypto = require('crypto');
// Does simple checks to make sure things are A-okay.
if(process.argv[2] == "test") {
  if (fs.existsSync('node_modules')) {
    console.log(chalk.green("[OK] node_modules exists."));
  } else {
    console.log(chalk.red("[FAIL] CONGRATULATIONS, YOU BROKE EVERYTHING. ASDFGHJKL;"));
  }
  if (fs.existsSync('storage/saimin.db')) {
    console.log(chalk.green("[OK] database file exists."));
    process.exit(0);
  } else {
    console.log(chalk.red("[FAIL] database file does not exist. creating one now."));
    fs.closeSync(fs.openSync('storage/saimin.db', 'w'));
    process.exit(1);
  }
}
// Timestamp function that refuses to work.
function timestamp(){
  timestamp = new Date();
  return timestamp.toLocaleString();
};
// :D
saimin.all('/areyoualive', function (req, res) {
  res.send("no");
});
// Fetches config files based on appid.
saimin.get('/config/:appid', function (req, res) {
  configdata = fs.readFile('./storage/configs/' + req.params.appid + '.json', 'utf8', (err, data) => {
    console.log(chalk.yellow("[INFO](" + Date().toLocaleString() + ") Got request for " + req.params.appid));
    if (err) {
      res.send("404");
      console.log(chalk.red("[ERROR](" + Date().toLocaleString() + ") Couldn't find it. :("));
    } else {
      res.send(data);
      console.log(chalk.yellow("[INFO](" + Date().toLocaleString() + ") Found it. Sending."));
    }
  });
});
// Gets the well-anticipated index of all configs.
saimin.get('/index', function (req, res) {
  var directory = "./storage/configs";
  var indexlist = {"0": "0"}
  fs.readdir( directory, function( err, files ) {
          files.forEach(function(file, index) {
            var indexid = file.replace(".json", "");
            var jsonfile = require('./storage/configs/' + indexid + '.json');
            indexlist[indexid] = jsonfile.name;
          });
          res.json(indexlist);
          console.log(chalk.yellow("[INFO](" + Date().toLocaleString() + ") Sending index."));
  });
});
// Respond with 410 because yes.
saimin.all('/', function (req, res) {
  res.send('410');
})
// Launch the integrated server.
saimin.listen(config.port, config.ip, function () {
  console.log(chalk.green("[INFO](" + Date().toLocaleString() + ") bsmapi listening on port " + config.port + "."));
});
// Handle Ctrl+C
if (process.platform === "win32") {
  var rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on("SIGINT", function () {
    process.emit("SIGINT");
  });
}
process.on("SIGINT", function () {
  console.log("Do not go gentle into that good night. Rage, rage against the dying of the light.");
  process.exit();
});
