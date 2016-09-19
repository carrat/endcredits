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
                option.attr("id", " ");
                option.val(this.id);
                option.html(this.name);
                $('#genre-options').append(option);
            })

        },
        errorCB);
    //code to get genre options from db. 

    for (i = new Date().getFullYear(); i > 1900; i--) {
        $('#years').append($('<option />').val(i).html(i));
    }

    //code to populate years

    $('#search').click(function() {
        var review = ($('#review').val());
        var date = ($('#start-date').val());
        // console.log(date);
        var year = moment(date).format('YYYY');
        var fullDate = moment(date).format('YYYY-MM-DD');
         console.log(fullDate);
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
                    $.each(movieResults.results, function(index, movieResult) {

                        //  console.log(movieResult);

                     
                                      console.log(this.name, this.id, this.poster_path, this.first_air_date, this.overview, this.vote_average);
                     
                    })

                },
                errorCB);
        }

    });

});
