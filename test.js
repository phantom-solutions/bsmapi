var fs = require('fs')
var path = require( 'path' );
var process = require( "process" );
var directory = "./storage/configs";
fs.readdir( directory, function( err, files ) {
        files.forEach(function(file, index) {
          var indexid = file.replace(".json", "");
          var indexfile = JSON.stringify(fs.readFile('./storage/configs/' + indexid + '.json', 'utf8', (err, data) => {
            console.log(data)
          }));
        })
});
