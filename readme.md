# BSMAPI - Borealis (Game)server Manager API
Just a simple API backend for the Borealis Gameserver Manager.

## Concept
The point behind this project is to provide a backend for the client application to fetch data from on the fly, thus removing the need to push data with app updates (the app can just check this bad boy for new stuff). It'll store server configurations, and that's about it, really. There's some foundation for other concepts to be introduced at a later point (authentication, etc.)

## Installation
1. Clone this repository: `git clone https://bitbucket.org/Mezarith/bsmapi`
2. Move into the directory (I shouldn't need to tell you how to do this).
3. Run `npm install` to download dependencies.
4. Run `npm start` to start the API.  

It'll begin listening on whatever port/ip is specified in the config file (config.json).

## Endpoints
**[GET/POST] /bsmver**  
Gets the commit sha of the BGM as the version number.  

**[GET/POST] /apiver**  
Gets the commit sha of this API's repository.  

**[GET] /config/:appid:**  
Gets a predefined config file and sends it to the client via XML (eww).   

**[PUT] /submit**  
Takes data, and creates a new config template.

## TODO
- Actually implement these endpoints.
- Find enough time to work on this.
- Decide on a database (preferrably sqlite due to the low amount of requests).
- Make this TODO more impressive. :feelsbadman:
- Work on otherworld middlewares.

## A note on how I do things
I make these random files and changes based on what I want to do with the project. Meaning, I'll create stuff with the intention to get it into the project at a later date. This is my version of writing stuff down on a piece of paper to remind myself of something.
