var fs = require('fs')
var path = require( 'path' );
var process = require( "process" );
var directory = "./storage/configs";
var appindex = JSON.stringify();
fs.readdir( directory, function( err, files ) {
        console.log(files)
        files.forEach(function(file, index) {
          console.log(file.replace(".json", ""))
          var indexid = file.replace(".json", "");
          var indexfile = JSON.parse(fs.readFile('./storage/configs/' + indexid + '.json', 'utf8', (err, data) => {
            //
          }));
          fs.readFile('./storage/configs/' + indexid + '.json', (err, data) => {
            if (err) throw err;
            console.log(data);
          });
          console.log(indexfile)
        })
});
