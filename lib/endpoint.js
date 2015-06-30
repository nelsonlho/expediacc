var express = require('express');
var fs      = require('fs');
var http    = require('http');
var cheerio = require('cheerio');
var xml2js  = require('xml2js');
var request = require('request');


exports.callExpedia = function(req, res) {
            if(!req.query.place){
                res.send({"status":"fail", "msg":"please enter ?place=citynameofyourchoice"});
                return false;
            }
            console.log(req.query.place);
            var place = req.query.place;

            defaultStart='08/03/2015';
            defaultEnd='08/04/2015';
            place= encodeURIComponent(place);
            xml1 = '<HotelListRequest><city>'+place+'</city><arrivalDate>'+defaultStart+'</arrivalDate><departureDate>'+defaultEnd+'</departureDate><RoomGroup><Room><numberOfAdults>2</numberOfAdults></Room></RoomGroup><numberOfResults>25</numberOfResults></HotelListRequest>';

            //console.log(xml1);
            //console.log('http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=99&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=USD&xml='+encodeURIComponent(xml1));
            var path = 'http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=99&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=USD&xml='+encodeURIComponent(xml1);
            request(path, function(error, response, body) {
              //console.log(body);
              res.send(body);
            });

}

exports.callAirbnb = function(req, res) {
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
           
            });

}