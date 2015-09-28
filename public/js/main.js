//runExp() prints "Search Expedia and Partners" when user selects Expedia
//else calls runAir()


//all lon lats for each new search go here in order
allLocations = [];


//all markers on the page for current search

allMarkers = [];




function runExp() {
  
  if (isAir == 0) {
    
    $('#somethingWicked').html('<center><br><h1>Searching Expedia and Partners...</h1><br><br><br><br><br></center>');

    getExpedia();
    // getAirBnB();
    $('html, body').animate({
      scrollTop: $('.sales .title-wrap').offset().top
    }, 1000);
  } else {
    runAir();
  }
}

//runAir prints "Searching AirBnB" 
function runAir() {
   
  // getExpedia();
  $('#somethingWicked').html('<center><br><h1>Searching AirBnB...</h1><br><br><br></center>');

  getAirBnB();
  $('html, body').animate({
    scrollTop: $('.sales .title-wrap').offset().top
  }, 1000);
}

//getExpedia() calls addPlace() to update DOM if a list of hotels are found for the searched destination
//otherwise retunrs "No results found"
function getExpedia() {
  
  $.getJSON('/expedia?place=' + $('#destination').val() + '&arrival='+$('#arrival').val() + '&departure='+$('#departure').val(), function(res) {

    $('#somethingWicked').html('');
    //console.log($('#destination').val() + '&arrival='+$('#arrival').val() + '&departure='+$('#departure').val());
    

    if (!res['HotelListResponse']) {

      $('#somethingWicked').html('<br><h1>No results found</h1><br>');
    }

    ruc = res['HotelListResponse']['HotelList']['HotelSummary'];
    allLocations = [];
    for (i in ruc) {

      var name = ruc[i]['name'];
      var placeId = ruc[i]['hotelId'];
      var desc = ruc[i]['shortDescription'].replace(/<p>.*?<br \/>/g, '');
      var locDesc = ruc[i]['locationDescription'];
      var image = 'http://origin-images.travelnow.com/' + ruc[i]['thumbNailUrl'];
      var url = ruc[i]['deepLink'];

      var lon = ruc[i]['longitude'];
      var lat = ruc[i]['latitude'];

<<<<<<< HEAD
      allLocations.push({'lat':parseFloat(lat), 'lng':parseFloat(lon), 'name':name})
=======
>>>>>>> d12742aa360937b0900e5180c0e85a641f62b432
      var rate = "$" + parseFloat(ruc[i]['lowRate']).toFixed(0);;
      var type = "Expedia";
      console.log(placeId + "desc:  " +desc );
      addPlace(name, image, desc, url, locDesc, rate, type, lat, lon);

    }
  })


  //all places added

  //add event listener for map
<<<<<<< HEAD

  setTimeout(function(){

    var lat = $('#somethingWicked div a div:nth(0)').attr('lat');
    var lon = $('#somethingWicked div a div:nth(0)').attr('lon');

    genMap(lat, lon);
  }, 5000)


  setTimeout(function(){


         $('.aResult').parent().on('mouseover', function(){
              //alert('hello');
            var thisOne = $(this).find('.aResult');
            //console.log(index)
            console.log('hovering');
            console.log(thisOne.attr('lat'));
            
            var lat =thisOne.attr('lat');
            var lon = thisOne.attr('lon');

            var eachElem = $('.aResult');
            console.log('for loop');
            for(ll=0; ll<eachElem.length; ll++){

              ///return;


                if(lat == $(eachElem[ll]).attr('lat') && lon == $(eachElem[ll]).attr('lon')){
                  console.log($(eachElem[ll]).attr('lat'))
              
                  allMarkers[ll].setIcon('images/nelsonMarkerActive.png');
                 // alert('got it! number is '+l);

                }
                else{
                   allMarkers[ll].setIcon('images/nelsonMarker.png');
                
                }
            }


            //addMarker({'lat':lat, 'lon':lon});

            //$(this).off('mouseover');

           })

  }, 4000)
 
}



function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/');
=======
  setTimeout(function(){

         $('#somethingWicked div a div').on('mouseover', function(){
              //alert('hello');
       
            console.log($(this).attr('lat'));
            var lat =$(this).attr('lat');
            var lon = $(this).attr('lon');

            addMarker({'lat':lat, 'lon':lon});
          var mapStyle = $('<div />').css({
               'position': 'fixed',
               'height': '100%',
               'right': '0px',
               'width': '20%',
               'z-index': '400',
               'top': '0px',
               'background-color': 'gray'
               /* 'height': '500px',
                'width': '500px',
                'margin': '0',
                'padding': '0',
                'margin': 'auto',*/
              
            });
            mapStyle.prependTo('#map-canvas');
            $(this).off('mouseover');

           })

  }, 2000)
 
>>>>>>> d12742aa360937b0900e5180c0e85a641f62b432
}



function genMap(lat, lon){
var mapWidth= (screen.width*.4)+'px';

var mapHeight= (screen.height)+'px';


//var mapWidth= '400px';

//var mapHeight= '400px';


console.log(mapWidth);

  $('html').append('<div style="position:fixed; height:100%; display:block; right:0px; width:40%; z-index:400; top:0px; background-color:gray" class="mapPlace"><div id="mapParent" style="position:relative"><div id="map" style="position:absolute; height:'+mapHeight+'; width:'+mapWidth+';"></div></div></div>')
console.log(lat)
console.log(lon)
  setTimeout(function(){
         map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: parseFloat(lat), lng: parseFloat(lon)},
          zoom: 12
          });
  
  }, 200)



    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if(scroll > 500){
          $('.mapPlace').fadeIn()

        }
        else{
          $('.mapPlace').fadeOut()

          
        }
    // Do something
    });


    setTimeout(function(){
        for(i in allLocations){

            var marker = new google.maps.Marker({
                      position: {lat:allLocations[i]['lat'], lng:allLocations[i]['lng']},
                       map: map,
                      title: allLocations[i]['name'],
                      icon: 'images/nelsonMarker.png'
            });

            allMarkers.push(marker);

        }
      
    }, 500)


}
//getAirBnB() calls addPlace() to update DOM if a list of hotels are found for the searched destination
//otherwise retunrs "No results found"
function getAirBnB() {
  $.getJSON('/airbnb?city=' + $('#destination').val(), function(res) {
    $('#somethingWicked').html('');

    if (!res['result']) {

      $('#somethingWicked').html('<br><h1>No results found</h1><br>');
    }
   
    ruc = res['result'];

    for (i in ruc) {

      var name = ruc[i]['attr']['heading'];
      var placeId = ruc[i]['id'];
      var desc = ruc[i]['attr']['description'].substr(0, 140) + "...";
      var locDesc = ruc[i]['attr']['roomType']['text'];
      var image = ruc[i]['photos'][0]['medium'];
      var url = ruc[i]['provider']['url'];

      var rate = "$" + parseFloat(ruc[i]['price']['nightly']).toFixed(0);;
      var type = "AirBnB";

      addPlace(name, image, desc, url, locDesc, rate, type);

    }

  })
}

//addPlace() appends to the list of hotels/abodes with the name, image, desc, url, locDesc, rate, and type
function addPlace(name, image, desc, url, locDesc, rate, type, lat, lon) {


  var doShow = checkFilters({'price':rate});
  theD = $('<div />').css({
    'width': '60%',
    'height': '250px',
    'background-color': 'white',
    'font-size': '20px',
    'font-color': 'black',
    'padding': '10px',
    'border-radius': '10px',
    'margin': '10px',
    'border-bottom-width': '2px',
    'border-bottom-style': 'solid',
    'border-bottom-color': '#999'
<<<<<<< HEAD
  }).html('<a href="' + url + '" style="text-decoration:none" target="_blank"><div lon = "'+lon+'" lat="'+lat+'" class="aResult" style="float:left; width: 30%; padding:5px; margin:5px; display:inline-block;"><h1>' + rate + '</h1><br><img src="' + image + '" style="height:100px; width:100px"></div><div style="display:inline-block; width:60%; float:right"><h2 >' + name + '</h2><br><h3 style="font-size:15px">' + desc + '</h3><br><p>' + locDesc + '</p></div></a>');

  theD.appendTo('#somethingWicked');

=======
  }).html('<a href="' + url + '" style="text-decoration:none" target="_blank"><div lon = "'+lon+'" lat="'+lat+'" style="float:left; width: 30%; padding:5px; margin:5px; display:inline-block;"><h1>' + rate + '</h1><br><img src="' + image + '" style="height:100px; width:100px"></div><div style="display:inline-block; width:60%; float:right"><h2 >' + name + '</h2><br><h3 style="font-size:15px">' + desc + '</h3><br><p>' + locDesc + '</p></div></a>');
>>>>>>> d12742aa360937b0900e5180c0e85a641f62b432




}


function checkFilters(arr){

  return true;
}
//0 is expedia, 1 is AirBnB
isAir = 0;

$(window).load(init1);

//init1() is run when page initially loads
//isAir = 0 (Expedia) is initially set
function init1() {

<<<<<<< HEAD
  $('#arrival').val(convertDate(new Date()));
    $('#departure').val(convertDate(new Date(new Date().setDate(new Date().getDate()+1))));
 console.log("hi");
=======
>>>>>>> d12742aa360937b0900e5180c0e85a641f62b432
  $('a').on('click', function(e) {
    e.preventDefault();
    if ($(this).attr('href') == "#" || $(this).attr('href') == "" || $(this).attr('href').indexOf('index') != -1) {
      $('#modLink').click();
    }
  })
  $('#aHomes').on('click', function() {
   
    isAir = 1;
  })
  $('#eHomes').on('click', function() {
    
    isAir = 0;

  })
   
  $('#search').on('click', function(){
    if (isAir == 0) {
        runExp();
      } else {
        runAir();
      }
  })
   
  //Determining whether runExp() or runAir() will be called
  $('#destination').on('keydown', function(e) {

    if (e.keyCode == 13) {

      if (isAir == 0) {
        
        runExp();
      } else {
        
        runAir();
      }
    }
  })
}

function doForm() {

  $('#modLink').click();
}

<<<<<<< HEAD

function addMarker(params){
  console.log(addMarker);

  console.log(params.lat);

  console.log(params.lon);
=======
function addMarker(params){

  console.log('add');
  var markerArr = [];
  var lat = params['lat'];
  var lon = params['lon'];
  function initialize(lat, lon) {
    console.log('init')
    var posLat, posLng;
    var marker;

    var mapOptions = {
      zoom: 12,
      center: new
      google.maps.LatLng(lat, lon)
  };
  
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
  
  

  var poslat = lat;
  var poslon = lon;

 
  
  placeMarker(lat, lon, map);

  
}

function placeMarker(lat, lon, map) {
  var position = new google.maps.LatLng(lat, lon);
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
  var lat = marker.getPosition().lat();
  var lng = marker.getPosition().lng();
 console.log("placemarker: " + lat + ": " + lng);
  markerArr.push(marker);
  /*if (markerArr.length > 1) {
    markerArr[0].setMap(null);
    markerArr.shift();

  }*/
 map.panTo(position);
}

google.maps.event.addDomListener(window, 'load', initialize(lat, lon));
 
>>>>>>> d12742aa360937b0900e5180c0e85a641f62b432
}