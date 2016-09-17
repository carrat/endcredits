function successCB(data) {
    console.log("Success callback: " + data);
};

function errorCB(data) {
            console.log("Error callback: " + data);
    };

$(document).ready(function() {
	theMovieDb.genres.getList('',
		function(json) {
			var results = $.parseJSON(json);  
			//console.log(results.genres);
			$.each(results.genres, function(index,genre) {
				var option = $('#default-genre-option').clone();
                option.id = '';
                option.val(this.id);
                option.html(this.name);
				$('#genre-options').append(option);
			})

		},
		errorCB);
});

//functions necessary for printing error or success codes

//var title = "Fight%20Club"

//theMovieDb.search.getMovie({"query":"Fight%20Club"}, successCB, errorCB);