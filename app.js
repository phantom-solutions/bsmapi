var chalk = require('chalk');
var request = require('request');
var fs = require('fs')
var path = require( 'path' );
var process = require( "process" );
var express = require('express');
var saimin = express();
var config = require('./storage/config.json');
const crypto = require('crypto');

//==============================================================//
// API REQUEST HANDLERS                                         //
//==============================================================//
// Fetches config files based on appid.
saimin.get('/config/:appid', function (req, res) {
configdata = fs.readFile('./storage/configs/' + req.params.appid + '.json', 'utf8', (err, data) => 
{
	console.log(chalk.bgGreen("[INFO]") + " (" + Date().toLocaleString() + ") " + chalk.bgBlue("[Got request for appID: " + req.params.appid + "]"));
	
	if (err) {
		res.send("404");
		console.log(chalk.bgRed("[ERROR]") + " (" + Date().toLocaleString() + ") " + chalk.bgBlue("[Couldn't locate appID: " + req.params.appid + "]"));
	} 
	else 
	{
		res.send(data);
		console.log(chalk.bgGreen("[INFO]") + " (" + Date().toLocaleString() + ") " + chalk.bgBlue("[Sending config data for appID: " + req.params.appid + "]"));
	}
});
});

// Gets the index of all configs.
saimin.get('/index', function (req, res) {
var directory = "./storage/configs";
var indexlist = {}
fs.readdir( directory, function( err, files ) 
{
	files.forEach(function(file, index) 
	{
		var indexid = file.replace(".json", "");
		var jsonfile = require('./storage/configs/' + indexid + '.json');
		indexlist[indexid] = jsonfile.SERVER_type;
    });
        res.json(indexlist);
        console.log(chalk.bgGreen("[INFO]") + " (" + Date().toLocaleString() + ") " + chalk.bgBlue("[Sending index...]"));
	});
});

// Launch the integrated server.
saimin.listen(config.port, config.ip, function () 
{
	console.log(chalk.bgGreen("[INFO]") + " (" + Date().toLocaleString() + ") " + chalk.bgGreen("[Borealis Server Manager API: listening on port: " + config.port + "]"));
});

// Respond with 410.
saimin.all('/', function (req, res) 
{
	res.send('410');
})

// Check for Alive Status
saimin.all('/areyoualive', function (req, res)
{
	res.send("yes");
});


//==============================================================//
// API SHUTDOWN HANDLERS                                        //
//==============================================================//
// Handle Server Shutdown
process.on("SIGINT", function () {
	console.log(chalk.bgRed("[SHUTTING DOWN]") + " (" + Date().toLocaleString() + ") " + chalk.bgRed("[Borealis Server Manager API: Shutting down...]"));
	process.exit();
});

// Handle Ctrl+C
if (process.platform === "win32") 
{
	var rl = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout
});
	rl.on("SIGINT", function () 
	{
		process.emit("SIGINT");
	});
}


//==============================================================//
// API DATABASE HANDLERS		    		                    //
//==============================================================//
// Does simple checks to make sure things are A-okay.
if(process.argv[2] == "test") {
	if (fs.existsSync('node_modules')) 
	{
		console.log(chalk.green("[OK] node_modules exists."));
	} 
	else
	{
		console.log(chalk.red("[FAIL] CONGRATULATIONS, YOU BROKE EVERYTHING. ASDFGHJKL;"));
	}
	
	if (fs.existsSync('storage/saimin.db')) 
	{
		console.log(chalk.green("[OK] database file exists."));
		process.exit(0);
	} 
	else 
	{
		console.log(chalk.red("[FAIL] database file does not exist. creating one now."));
		fs.closeSync(fs.openSync('storage/saimin.db', 'w'));
		process.exit(1);
	}
}