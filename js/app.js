var studyApp = {};

// GEOLOCATION
studyApp.lat = '';
studyApp.lng = '';
studyApp.venueLat = '';
studyApp.venueLng = '';
studyApp.getLocation = function() {
  //Askes user to allow us to get their current position
  navigator.geolocation.getCurrentPosition(function(pos) {
    studyApp.lat = pos.coords.latitude;
    studyApp.lng = pos.coords.longitude;
    studyApp.events();
  });
};

studyApp.getInfo = function(location, distance){
    $.ajax({
        url : 'https://api.foursquare.com/v2/venues/search',
        dataType : 'jsonp',
        type : 'GET',
        data : {
            client_id : 'ZHRXIVYVW0V12O5EJKB3IAVECFDCIS4CR0IKD2BZ5BR20MZ0',
            client_secret : 'LSNZH50TMXL4YEQFDB25OPM0GENFDDHIHSWCZOA3ADC2RVZ5',
            v: '20150615',
            ll: studyApp.lat + ',' + studyApp.lng,
            limit: 50,
            query: location,
            radius: distance
        },
        success: function(res) {
            console.log(res);
            studyApp.displayInfo();
        }
    });
};

studyApp.events = function() {
  $('#submit').on('click', function(){
    var searchLoc = $('input.noiseLoc:checked').val();
    console.log(searchLoc);
    var searchDist = $('input.transport:checked').val();
    console.log(searchDist);
    studyApp.getInfo(searchLoc, searchDist);
  })
};

studyApp.displayInfo = function() {

};

studyApp.init = function() {
    studyApp.events();
    studyApp.getLocation();
};

$(document).ready(function(){
    studyApp.init();

});