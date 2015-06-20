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


// var studyApp = {};

studyApp.getInfo = function(location, distance){
    $.ajax({
        url : 'https://api.foursquare.com/v2/venues/explore',
        dataType : 'jsonp',
        type : 'GET',
        data : {
            client_id : 'ZHRXIVYVW0V12O5EJKB3IAVECFDCIS4CR0IKD2BZ5BR20MZ0',
            client_secret : 'LSNZH50TMXL4YEQFDB25OPM0GENFDDHIHSWCZOA3ADC2RVZ5',
            v: '20150615',
            ll: studyApp.lat + ',' + studyApp.lng,
            limit: 50,
            venuePhotos: 1,
            query: location,
            radius: distance
        },
        success: function(res) {
            console.log(res);
            if (distance == '1000') {
                studyApp.displayWalk(res.response.groups[0].items);
            } else if (distance == '5000') {
                studyApp.displayBike(res.response.groups[0].items);
            } else if (distance == '10000') {
                studyApp.displayDrive(res.response.groups[0].items);
            }
        }
    });
};

studyApp.events = function() {
  $('#submit').on('click', function(){
    var searchLoc = $('input.noiseLoc:checked').val();
    console.log(searchLoc);
    var searchDist = $('input.transport:checked').val();
    // console.log(searchDist);
    studyApp.getInfo(searchLoc, searchDist);
  })
};

studyApp.displayWalk = function(studyInfo) {
    console.log(studyInfo[0].venue.location.distance);
    console.log(studyInfo);
    $('.printContainer').empty();
    $.each(studyInfo, function(i, study) {
        if (studyInfo[i].venue.location.distance < 1500) {
            var $name = $('<h3>').text(study.venue.name);  
            var $location = $('<p>').text(study.venue.location.address);
            var $distance = $('<p>').text('You are ' + study.venue.location.distance + 'm away.');
            //you can change the photo size to 100x100 too
            var $photo = $('<img>').attr('src',study.venue.photos.groups[0].items[0].prefix + '300x300' + study.venue.photos.groups[0].items[0].suffix);
            $('.printContainer').append($name, $location, $distance, $photo);
        };
    });
};

studyApp.displayBike = function(studyInfo) {
    console.log(studyInfo[0].venue.location.distance);
    console.log(studyInfo);
    $('.printContainer').empty();
    $.each(studyInfo, function(i, study) {
        if (studyInfo[i].venue.location.distance > 2500 && studyInfo[i].venue.location.distance < 5000) {
            var $name = $('<h3>').text(studyInfo[i].venue.name);  
            var $location = $('<p>').text(study.venue.location.address);
            var $distance = $('<p>').text('You are ' + study.venue.location.distance + 'm away.');
            var $photo = $('<img>').attr('src',study.venue.photos.groups[0].items[0].prefix + '300x300' + study.venue.photos.groups[0].items[0].suffix);
            $('.printContainer').append($name, $location, $distance, $photo);
        };
    });
};

studyApp.displayDrive = function(studyInfo) {
    console.log(studyInfo[0].venue.location.distance);
    console.log(studyInfo);
    $('.printContainer').empty();
    $.each(studyInfo, function(i, study) {
        if (studyInfo[i].venue.location.distance > 5000) {
            var $name = $('<h3>').text(study.name);  
            var $location = $('<p>').text(study.location.address);
            var $distance = $('<p>').text('You are ' + study.location.distance + 'm away.');
            var $photo = $('<img>').attr('src',study.venue.photos.groups[0].items[0].prefix + '300x300' + study.venue.photos.groups[0].items[0].suffix);
            $('.printContainer').append($name, $location, $distance, $photo);
        };
    });
};

studyApp.init = function() {
	studyApp.events();
    studyApp.getLocation();
};

$(document).ready(function(){
	studyApp.init();

});