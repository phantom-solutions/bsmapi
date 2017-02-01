var request = require('request');
var db_middleware = require('./otherworld/db.middleware.js');
var fs = require('fs');
var chalk = require('chalk');
// STILL HAVE YET TO WORK ON THIS BRB
if(process.argv[2] == "test") {
  if (fs.existsSync('node_modules')) {
    console.log(chalk.green("[OK] node_modules exists."));
  } else {
    console.log(chalk.red("[FAIL] CONGRATULATIONS, YOU BROKE EVERYTHING. ASDFGHJKL;"));
  }
  if (fs.existsSync('storage/saimin.db')) {
    console.log(chalk.green("[OK] database file exists."));
  } else {
    console.log(chalk.red("[FAIL] database file does not exist. creating one now."));
    fs.closeSync(fs.openSync('storage/saimin.db', 'w'));
  }
}
