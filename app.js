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
var winston = require('winston');
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
console.log(timestamp())

// Start the logger.
var applog = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: './storage/app.log' })
  ]
});

// :D
saimin.all('/areyoualive', function (req, res) {
  res.send("no");
});

// Fetches config files based on appid.
saimin.get('/config/:appid', function (req, res) {
  configdata = fs.readFile('./storage/configs/' + req.params.appid + '.json', 'utf8', (err, data) => {
    applog.info(timestamp() + " received request for appid " + req.params.appid + ".");
    if (err) {
      applog.error(timestamp() + " couldn't find that config. my b.");
      res.send("404");
    } else {
      applog.info(timestamp() + " found config - sending it.");
      res.send(data);
    }
  });
});

saimin.post('/hash', function (req, res) {
  const hash = crypto.createHash('sha256');
  var hashdata = req.data;
  hash.on('readable', () => {
    const data = hash.read();
    if (data)
      res.send(data.toString('hex'));
  });
  hash.write(hashdata);
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
  });
});

// Handle authentication
saimin.post('/user/:action', function (req, res) {
  if (req.params.action == "register") {
    //
  }
});

// Respond with 410 because yes.
saimin.all('/', function (req, res) {
  res.send('410');
})

// Launch the integrated server.
saimin.listen(config.port, function () {
  console.log(chalk.green("bsmapi listening on port " + config.port + "."));
});

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
  process.exit();
});
