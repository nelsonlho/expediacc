//runExp() prints "Search Expedia and Partners" when user selects Expedia
//else calls runAir()
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

    for (i in ruc) {

      var name = ruc[i]['name'];
      var placeId = ruc[i]['hotelId'];
      var desc = ruc[i]['shortDescription'].replace(/<p>.*?<br \/>/g, '');
      var locDesc = ruc[i]['locationDescription'];
      var image = 'http://origin-images.travelnow.com/' + ruc[i]['thumbNailUrl'];
      var url = ruc[i]['deepLink'];

      var rate = "$" + parseFloat(ruc[i]['lowRate']).toFixed(0);;
      var type = "Expedia";
      console.log(placeId + "desc:  " +desc );
      addPlace(name, image, desc, url, locDesc, rate, type);

    }
  })
}

//getAirBnB() calls addPlace() to update DOM if a list of hotels are found for the searched destination
//otherwise retunrs "No results found"
function getAirBnB() {
  $.getJSON('/airbnb?city=' + $('#destination').val(), function(res) {
    $('#somethingWicked').html('');

    if (!res['result']) {

      $('#somethingWicked').html('<br><h1>No results found</h1><br>');
    }
    console.log(res);
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
function addPlace(name, image, desc, url, locDesc, rate, type) {

  theD = $('<div />').css({
    'width': '100%',
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
  }).html('<a href="' + url + '" style="text-decoration:none" target="_blank"><div style="float:left; width: 30%; padding:5px; margin:5px; display:inline-block;"><h1>' + rate + '</h1><br><img src="' + image + '" style="height:100px; width:100px"></div><div style="display:inline-block; width:60%; float:right"><h2 >' + name + '</h2><br><h3 style="font-size:15px">' + desc + '</h3><br><p>' + locDesc + '</p></div></a>');

  theD.prependTo('#somethingWicked');

}

//0 is expedia, 1 is AirBnB
isAir = 0;

$(window).load(init1);

//init1() is run when page initially loads
//isAir = 0 (Expedia) is initially set
function init1() {
 console.log("hi");
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