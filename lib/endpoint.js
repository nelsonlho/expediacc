var express = require('express');
var fs      = require('fs');
var http    = require('http');
var cheerio = require('cheerio');
var xml2js  = require('xml2js');
var request = require('request');

//callExpedia(req, res) -- Takes dates and city from user, then call Expedia API for a list of returned homes, hotels and hostels

exports.callExpedia = function(req, res) {
            if(!req.query.place){
                res.send({"status":"fail", "msg":"please enter ?place=citynameofyourchoice"});
                return false;
            }
            var startDay;
            var endDay;
            
            //DefaultStart and DefaultEnd are today are tomorrow, respective.  We will refine this based on the geolocation of user
              
            var today = new Date();
            var tomorrow = new Date(today);
            tomorrow.setDate(today.getDate()+1);
            defaultStart= ("0" + (today.getMonth() + 1)).slice(-2) + "/" + ("0" + today.getDate()).slice(-2) + "/" + today.getFullYear() ;
            defaultEnd=("0" + (tomorrow.getMonth() + 1)).slice(-2) + "/" + ("0" + tomorrow.getDate()).slice(-2) + "/" + tomorrow.getFullYear();
           

            //Setting startDay and endDay as today and tomorrow
            if (!req.query.arrival && !req.query.departure){
              res.send({"status":"fail", "msg":"please enter ?departure=mm/dd/yyyy and arrival the same"});
              return false;
              
            }

            //Asking user to enter departure and arrival dates.  Much easier to rely on the front end for correct dates, but will include
            //function checkDateFormat(dateString) in the future
            else if (!req.query.departure || req.query.departure.length != 10){
              res.send({"status":"fail", "msg":"please enter ?departure=mm/dd/yyyy"});
              return false;
            }
            else if (! req.query.arrival || req.query.arrival.length != 10){
              res.send({"status":"fail", "msg":"please enter ?arrival=mm/dd/yyyy"});
              return false;
            }
            
            startDay= req.query.arrival;
            endDay  = req.query.departure;
         
            console.log(startDay + ": " + typeof startDay);
            var place = req.query.place;

            
            //Making sure place has the right format.  
            place= encodeURIComponent(place);
            console.log(place);
            xml1 = '<HotelListRequest><city>'+place+'</city><arrivalDate>'+startDay+'</arrivalDate><departureDate>'+endDay+'</departureDate><RoomGroup><Room><numberOfAdults>2</numberOfAdults></Room></RoomGroup><numberOfResults>25</numberOfResults></HotelListRequest>';

            //console.log(xml1);
            //console.log('http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=99&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=USD&xml='+encodeURIComponent(xml1));
            
            //Sending xml to expedia
            var path = 'http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=99&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=USD&xml='+encodeURIComponent(xml1);
            
            //Sending response back
            request(path, function(error, response, body) {
              //console.log(body);
              res.send(body);
            });


}

//callAirBnb(req, res) -- Takes dates and city from user, then call Expedia API for a list of returned homes, hotels and hostels
exports.callAirbnb = function(req, res) {
            
            //Making sure both city and state are entered
            if (!req.query.city || !req.query.state){
              res.send({"status":"fail", "msg":"please tell us which city you want to search for (i.e. ?city=San Francisco&state=CA"});
                return false;
            }
            var state = "";
            var pricemax = "";
            var pricemin = "";
            
            //Getting state 
            if (req.query.state){
                state= req.query.state;
            }

            var address = req.query.city+state;
            
            if (req.query.pricemax ){
              pricemax = req.query.priceMax;
            }

            if (req.query.priceMin ){
              pricemin = req.query.pricemin;
            }

            //method, URL, and headers for Google Map API request
            var googleMapOptions = {
              method:'POST',
              url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+address,
              headers: {
              }
            };


            request(googleMapOptions, function(err, data){
               //Parsing JSON and getting the longitude and latitude of location
               //Latitude and Longitude of location are necessary to making the API call
               var json = JSON.parse(data.body);
               var lat = json.results[0].geometry.location.lat;
               var lon = json.results[0].geometry.location.lng;
               var options = {
               
               //Making second API call to an Airbnb-like webservice
               method:'POST',
               url: 'https://zilyo.p.mashape.com/search?latitude='+lat+'&longitude='+lon+'&pricemax='+pricemax+'&pricemin='+pricemin,
               headers: {
                'X-Mashape-Key': 'tcuqOjloPemshpTEzhbU4Kr7R2EHp1a7HOTjsnnrSYS5cOETim','Accept': 'application/json'
              }
            };

            request(options, function(err, data){


                res.send(data.body);
             });
           
            });

}