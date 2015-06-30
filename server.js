#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var http    = require('http');
var cheerio = require('cheerio');
var xml2js  = require('xml2js');
var request = require('request');



/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };

        self.routes['/expedia'] = function(req, res) {

            if(!req.query.place){
                res.send({"status":"fail", "msg":"please send place"});
                return false;
            }

            var place = req.query.place;
            defaultStart='08/03/2015';
            defaultEnd='08/04/2015';
            place= encodeURIComponent(place);
            xml1 = '<HotelListRequest><city>'+place+'</city><arrivalDate>'+defaultStart+'</arrivalDate><departureDate>'+defaultEnd+'</departureDate><RoomGroup><Room><numberOfAdults>2</numberOfAdults></Room></RoomGroup><numberOfResults>25</numberOfResults></HotelListRequest>';


            console.log('http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=99&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=USD&xml='+encodeURIComponent(xml1));

            self.download('http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=99&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=USD&xml='+encodeURIComponent(xml1), function(res1){
                
                console.log(res1);
                res.send(res1);

                
            });

        };

        self.routes['/airbnb'] = function(req, res) {
            if (!req.query.city || !req.query.state){
              res.send({"status":"fail", "msg":"please tell us which city you want to search for (i.e. ?city=San Francisco&state=CA"});
                return false;
            }
            var state = "";
            
            if (req.query.state !== null){
                state= req.query.state;
            }
            var address = req.query.city+state;

            var googleMapOptions = {
              method:'POST',
              url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+address,
              headers: {
              }
            };

            request(googleMapOptions, function(err, data){
                var json = JSON.parse(data.body);
               // console.log(data.body);
               var lat = json.results[0].geometry.location.lat;
               var lon = json.results[0].geometry.location.lng;
               var options = {
               method:'POST',
              url: 'https://zilyo.p.mashape.com/search?latitude='+lat+'&longitude='+lon,
              headers: {
                'X-Mashape-Key': 'tcuqOjloPemshpTEzhbU4Kr7R2EHp1a7HOTjsnnrSYS5cOETim','Accept': 'application/json'
              }
            };

            request(options, function(err, data){


                res.send(data.body);
             });
              //  console.log(lat + "asdf"+lon);

               // res.send(json.results[0].geometry.location.lng);
            });
            /*
             if(!req.query.lat || !req.query.lon){
                res.send({"status":"fail", "msg":"please send plat and lon. eg ?lat=40.75458&lon=73.97749"});
                return false;
            }

            var lat = req.query.lat
            var lon= req.query.lon
            */
            
           /* var options = {
                method:'POST',
              url: 'https://zilyo.p.mashape.com/search?latitude='+lat+'&longitude='+lon,
              headers: {
                'X-Mashape-Key': 'tcuqOjloPemshpTEzhbU4Kr7R2EHp1a7HOTjsnnrSYS5cOETim','Accept': 'application/json'
              }
            };

            request(options, function(err, data){


                res.send(data.body);
            });
*/



           
        };


    };


    self.download=function(url, callback) {
              http.get(url, function(res) {
                var data = "";
                res.on('data', function (chunk) {
                  data += chunk;
                });
                res.on("end", function() {
                  callback(data);
                });
              }).on("error", function() {
                callback(null);
              });
    }


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express.createServer();

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();

