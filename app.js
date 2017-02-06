var chalk = require('chalk');
var request = require('request');
var db_middleware = require('./otherworld/db.middleware.js');
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

// Main code base.
saimin.get('/bsmver', function (req, res) {
  request('https://api.github.com/repos/cyberstrawberry101/Borealis-Game-Manager/git/refs/heads/master', function (error, response, data) {
    if (!error && response.statusCode == 200) {
      res.send(body.object.sha);
    }
  })
});
saimin.all('/areyoualive', function (req, res) {
  res.send("no");
});

// Fetches config files based on appid.
saimin.get('/config/:appid', function (req, res) {
  configdata = fs.readFile('./storage/configs/' + req.params.appid + '.json', 'utf8', (err, data) => {
    console.log("config request for appid " + req.params.appid);
    if (err) {
      console.log("error: config not found");
      res.send("404");
    } else {
      console.log("config found; sending data");
      res.send(data);
    }
  });
});

saimin.post('/hash', function (req, res) {
  var hashdata = req.body.data;
  res.send(crypto.createHmac('sha256', hashdata));
})

// Gets the well-anticipated index of all configs.
saimin.get('/index', function (req, res) {
  var directory = "./storage/configs";
  var indexlist = {"90": "Counter-Strike 1.6"}
  fs.readdir( directory, function( err, files ) {
          files.forEach(function(file, index) {
            var indexid = file.replace(".json", "");
            var jsonfile = require('./storage/configs/' + indexid + '.json');
            indexlist[indexid] = jsonfile.name;
          });
          res.send(indexlist);
  });
})

// Launch the integrated server.
saimin.listen(config.port, function () {
  console.log(chalk.green("bsmapi listening on port " + config.port + "."));
});
