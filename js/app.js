var studyApp = {};

studyApp.getInfo = function(){
    $.ajax({
        url : 'https://api.foursquare.com/v2/venues/search',
        dataType : 'jsonp',
        type : 'GET',
        data : {
            client_id : 'ZHRXIVYVW0V12O5EJKB3IAVECFDCIS4CR0IKD2BZ5BR20MZ0',
            client_secret : 'LSNZH50TMXL4YEQFDB25OPM0GENFDDHIHSWCZOA3ADC2RVZ5'
        },
        success: function(res) {
            console.log(res);
        }
    });
};

studyApp.init = function() {
	$('#submit').on('click', function(){
		var searchLoc = $('input.noiseLoc:checked').val();
		console.log(searchLoc);
		var searchDist = $('input.trasnport:checked').val();
		console.log(searchDist);
	})
};

$(document).ready(function(){
	studyApp.init();
});