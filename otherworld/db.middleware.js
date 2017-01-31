// The Godfather of the app. The primary database interface for the API.
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./storage/saimin.db');
