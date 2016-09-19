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
                var option = $('<option>').attr('class', 'genre');
                option.attr("id", " ");
                option.val(this.id);
                option.html(this.name);
                //console.log(this.name);
                $('#genre-options').append(option);
            })

            $('select').material_select();

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







    $('#search').click(function() {

        var lookup = $('.lookup').val();

        console.log("Click");
        var review = ($('#review').val());
        var year = ($('#yearOne').val());
        var title = ($('#search-text').val());
        //console.log(title);
        //create variables with search parameters
        // theMovieDb.discover.getMovies({language: "eng",review: review, title: title }, successCB, errorCB);
        //code to discover movies
        
        if (lookup === 'on') {
        	theMovieDb.search.getMovie({ language: "eng", review: review, query: title},
            function(json) {
                var movieResults = $.parseJSON(json);
                $.each(movieResults, function(index, movieResult) {

                //  console.log(movieResult);

                console.log(movieResult);

                    if ($.isEmptyObject(movieResult) == false) {

                        $.each(movieResult, function(index, movie) {

                         
                            outputSearchMovie(movie);
                        });
                    }
                })

            },
            errorCB);

         
        }
        
        else {
         	theMovieDb.discover.getTvShows({ language: "eng", review: review, title: title, year: year},
            function(json) {
                var movieResults = $.parseJSON(json);
                $.each(movieResults, function(index, movieResult) {

                     console.log("TV");
                      console.log(lookup);

                  //  console.log(movieResult);

                    if ($.isEmptyObject(movieResult) == false) {

                        $.each(movieResult, function(index, movie) {

                            console.log(this.name, this.id, this.poster_path, this.first_air_date, this.overview, this.vote_average);
                        });
                    }
                })

            },
            errorCB);
         }

    });


    function outputSearchMovie(results) {
        resultsItem = $('<li>').attr('id', results.id);
        $(resultsItem).html('<div class="collapsible-header"><i class="material-icons deep-orange-text darken-4-text">new_releases</i>' + results.title + '</div><div class="collapsible-body white-text"><p>' +  results.overview +'</p> <p><a class="modal-trigger center-align more-info waves-effect" href="#modal1" data-id="' + results.id + '">More Info</a></p></div>')

        $('#search-results-collection').append(resultsItem);
    }

});



