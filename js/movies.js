function successCB(data) {
    //   console.log("Success callback: " + data);
};

function errorCB(data) {
    //   console.log("Error callback: " + data);
};

$(document).ready(function() {
    theMovieDb.genres.getList('',
        function(json) {
            var results = $.parseJSON(json);
            //console.log(results.genres);
            $.each(results.genres, function(index, genre) {
                var option = $('#default-genre-option').clone();
                option.attr("id", "");
                option.val(this.id);
                option.html(this.name);
                $('#genre-options').append(option);
            })

             $('select').material_select();

        },
        errorCB);
    //code to get genre options from db. 

    for (i = new Date().getFullYear(); i > 1900; i--) {
        $('#years').append($('<option />').val(i).html(i));
    }

    //code to populate years
    
     $('.lookup').change(function() {

        if ($('.lookup').val() === 'on') {
            $('.lookup').val('off');
        }

        else {
            $('.lookup').val('on');
        }

        console.log($('.lookup').val());

    });

    

    $('#search').click(function() {
        var review = ($('#review').val());
        var date = ($('#start-date').val());
        // console.log(date);
        var year = moment(date).format('YYYY');
        // console.log(year);
        var title = ($('#search-text').val());


        if ($('#lever').val() === 0) {
            theMovieDb.discover.getMovies({ language: "eng", review: review, title: title, year: year },
                function(json) {
                    var movieResults = $.parseJSON(json);
                    $.each(movieResults.results, function(index, movieResult) {
                        //  console.log(movieResult);
                        console.log(this.title, this.id, this.poster_path, this.release_date, this.overview, this.vote_average);

                    })

                },
                errorCB);


        } else {
            theMovieDb.discover.getTvShows({ language: "eng", review: review, title: title, first_air_date_year: year },
                function(json) {
                    var movieResults = $.parseJSON(json);
                    $('.group-results').html('');
                    $.each(movieResults.results, function(index, movieResult) {
                        //  console.log(movieResult);
                        console.log(this.name, this.id, this.poster_path, this.first_air_date, this.overview, this.vote_average);
                   	 	var tvResults = $('#results-clone').clone();
                   	 	tvResults.attr("id","");
	          			var tvResultsModal = $('#modal-clone').clone();
	          			tvResultsModal.attr("id","");
	          			tvResults[0].querySelector('.results-header').innerHTML = this.name;
	          			tvResults[0].querySelector('.overview').innerHTML = this.overview;
	          			tvResultsModal[0].querySelector('.movie-poster').src = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.poster_path;
	          			$('.group-results').append(tvResults);
	          			$('.group-results').append(tvResultsModal);
                    })

                },

                errorCB);


        }

    });

});
