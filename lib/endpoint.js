var express = require('express');
var fs      = require('fs');
var http    = require('http');
var cheerio = require('cheerio');
var xml2js  = require('xml2js');
var request = require('request');


exports.callExpedia = function(req, res) {
            
            console.log(req.query.place);
            var place = req.query.place;

            defaultStart='08/03/2015';
            defaultEnd='08/04/2015';
            place= encodeURIComponent(place);
            xml1 = '<HotelListRequest><city>'+place+'</city><arrivalDate>'+defaultStart+'</arrivalDate><departureDate>'+defaultEnd+'</departureDate><RoomGroup><Room><numberOfAdults>2</numberOfAdults></Room></RoomGroup><numberOfResults>25</numberOfResults></HotelListRequest>';

            console.log(xml1);
            console.log('http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=99&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=USD&xml='+encodeURIComponent(xml1));
            var path = 'http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=99&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=USD&xml='+encodeURIComponent(xml1);
            request(path, function(error, response, body) {
              //console.log(body);
              res.send(body);
            });

            /*self.download('http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=99&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=USD&xml='+encodeURIComponent(xml1), function(res1){
                
                //console.log(res1);
                res.send(res1);

                
            });*/
}
