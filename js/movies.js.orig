function successCB(data) {
    //   console.log("Success callback: " + data);
};

function errorCB(data) {
    //   console.log("Error callback: " + data);
};

$(document).ready(function() {

// Create dropdown select elements for form
    theMovieDb.genres.getList('',
        function(json) {
            var results = $.parseJSON(json);
            //console.log(results.genres);
            $.each(results.genres, function(index, genre) {
<<<<<<< HEAD
                var option = $('#default-genre-option').clone();
                option.attr("id", "");
=======
                var option = $('<option>').attr('class', 'genre');
                option.attr("id", " ");
>>>>>>> master
                option.val(this.id);
                option.html(this.name);
                //console.log(this.name);
                $('#genre-options').append(option);
            })
<<<<<<< HEAD

             $('select').material_select();

=======
            $('select').material_select(); // activates materialize select box - will not work without this code
>>>>>>> master
        },
        errorCB);
    //code to get genre options from db. 
    for (i = new Date().getFullYear(); i > 1900; i--) {
        $('#year-options').append($('<option />').val(i).html(i));
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

    

    
    // record changes to Movie/TV Slider
    $('.lookup').change(function() {
        if ($('.lookup').val() === 'on') {
            $('.lookup').val('off');
        }
        else {
            $('.lookup').val('on');
        }
    });

    $('#search').click(function() {

        $('#search-results-collection').empty();
        $('#search-results').show();

        var lookup = $('.lookup').val(); // slider to determine if search is for movies or TV
        var review = ($('#review').val());
        var date = ($('#start-date').val());
        // console.log(date);
        var year = moment(date).format('YYYY');
        // console.log(year);
        var title = $.trim($('#search-text').val());


        //console.log(title);
        //create variables with search parameters
        // theMovieDb.discover.getMovies({language: "eng",review: review, title: title }, successCB, errorCB);
        //code to discover movies
        
        if (lookup === 'on') {
        	theMovieDb.search.getMovie({ language: "eng", review: review, query: title},
            function(json) {
                var movieResults = $.parseJSON(json);
                $.each(movieResults, function(index, movieResult) {
                console.log(movieResult);
                    if ($.isEmptyObject(movieResult) == false) {
                        //  console.log(movieResult);    
                        $.each(movieResult, function(index, movie) {
                            console.log(this.title, this.id, this.poster_path, this.release_date, this.overview, this.vote_average);
                            outputSearchMovie(movie);
                        });                          
                    }
                })
            },
            errorCB);
        } else {
            theMovieDb.discover.getTvShows({ language: "eng", review: review, title: title, first_air_date_year: year },
                function(json) {
                    var movieResults = $.parseJSON(json);
                    $.each(movieResults.results, function(index, movieResult) {
<<<<<<< HEAD
                        //  console.log(movieResult);
                        console.log(this.title, this.id, this.poster_path, this.release_date, this.overview, this.vote_average);

=======
                        console.log(this.name, this.id, this.poster_path, this.first_air_date, this.overview, this.vote_average);
                        if ($.isEmptyObject(movieResult) == false) {
                        //  console.log(movieResult);    
                            $.each(movieResult, function(index, movie) {
                                console.log(this.title, this.id, this.poster_path, this.release_date, this.overview, this.vote_average);
                                outputSearchTV(movie);
                            });                   
                        }
>>>>>>> master
                    })
                },
                errorCB);
        }
    });


<<<<<<< HEAD
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
                         $('.modal-trigger').leanModal();
                },

                errorCB);


=======
    function outputSearchMovie(results) {
    // create item for search results collection
        resultsItem = $('<li>').attr('id', results.id);
        $(resultsItem).html('<div class="collapsible-header"><i class="material-icons deep-orange-text darken-4-text">new_releases</i>' + results.title + '</div>')

        itemBodyDiv = $('<div>').attr("class", "collapsible-body white-text").html("<p>" + results.overview + "</p>");
        moreInfo = $('<a>').attr("class", "modal-trigger center-align more-info waves-effect").attr("href", "#modal-" + results.id).attr("data-id", results.id);
        $(moreInfo).html("More Info");

        $(itemBodyDiv).append(moreInfo);
        $(resultsItem).append(itemBodyDiv);
       
        modalDiv = $('<div>').attr("id", "modal-"+ results.id).attr("class", "modal");

        modalContentDiv = $('<div>').attr("class", "modal-content").html("<h4>"+ results.title + "</h4>");

        if (results.poster_path !== null) {
            modalImage = $('<img>').attr('class', 'movie-poster').attr('src', 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' +results.poster_path);
            $(modalContentDiv).append(modalImage);
>>>>>>> master
        }
        $(modalContentDiv).append('<p class="description">'+ results.overview + '</p>');

        if (results.release_date !== '') {
            $(modalContentDiv).append('<p class="releaseDate">Release Date: ' + moment(results.release_date).format("M/D/YYYY") + '</p>');
        }
        $(modalContentDiv).append('<p class="voteAverage">Rating: ' + results.vote_average + '</p>');
        $(modalContentDiv).append('<p class="genres">Genre: ' + results.genre_ids + '</p>');



 // now add trailer, streaming info, and additional fields to modalContentDiv
 //
 //
 //

        $(modalDiv).html(modalContentDiv);

        $(resultsItem).append(modalDiv);
    // write each item to collection
        $('#search-results-collection').append(resultsItem);
    // activate modal
        $('.modal-trigger').leanModal();

        $('.modal-trigger').on("click", getGuideboxId());
 
    }

    function outputSearchTV(results) {

    // create item for search results collection
        resultsItem = $('<li>').attr('id', results.id);
        $(resultsItem).html('<div class="collapsible-header"><i class="material-icons deep-orange-text darken-4-text">new_releases</i>' + results.title + '</div>')

        itemBodyDiv = $('<div>').attr("class", "collapsible-body white-text").html("<p>" + results.overview + "</p>");
        moreInfo = $('<a>').attr("class", "modal-trigger center-align more-info waves-effect").attr("href", "#modal-" + results.id).attr("data-id", results.id);
        $(moreInfo).html("More Info");

        $(itemBodyDiv).append(moreInfo);
        $(resultsItem).append(itemBodyDiv);
       
        modalDiv = $('<div>').attr("id", "modal-"+ results.id).attr("class", "modal");

        modalContentDiv = $('<div>').attr("class", "modal-content").html("<h4>"+ results.title + "</h4>");

        if (results.poster_path !== null) {
            modalImage = $('<img>').attr('class', 'movie-poster').attr('src', 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' +results.poster_path);
            $(modalContentDiv).append(modalImage);
        }
        $(modalContentDiv).append('<p class="description">'+ results.overview + '</p>');

        if (results.release_date !== '') {
            $(modalContentDiv).append('<p class="releaseDate">Release Date: ' + moment(results.release_date).format("M/D/YYYY") + '</p>');
        }
        $(modalContentDiv).append('<p class="voteAverage">Rating: ' + results.vote_average + '</p>');
        $(modalContentDiv).append('<p class="genres">Genre: ' + results.genre_ids + '</p>');

        $(modalDiv).html(modalContentDiv);

        $(resultsItem).append(modalDiv);
    // write each item to collection
        $('#search-results-collection').append(resultsItem);
    // activate modal
        $('.modal-trigger').leanModal();
    }


    function getGuideboxId() {
        // get the corresponding Guidebox ID from the themovieddb ID

        var id = $(this).attr("data-id");



        var queryURL = "http://api-public.guidebox.com/v1.43/US/rKwkNTh5aiZK8KPTmhj7bdYPhqvJRg0q/search/movie/id/themoviedb/" + id; // search API

        $.ajax({
            url: queryURL, 
            method: 'GET'
        })
            .done(function(response) {
                var results = response.data; // this will 
                var guideboxID = response.id;
                getExtendedInfo(guideboxID);

        });
        
       
    }


    function getExtendedInfo(id) {

    //Get extended info for a Movie or Episode from Guidebox and output to modal

        var queryURL = "http://api-public.guidebox.com/v1.43/US/rKwkNTh5aiZK8KPTmhj7bdYPhqvJRg0q/movie/" + id; // search API

        $.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {
                var results = response.data;

              return results

        });
        
      
    
    }




});