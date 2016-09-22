function successCB(data) {
    //   console.log("Success callback: " + data);
};

function errorCB(data) {
    //   console.log("Error callback: " + data);
};

$(document).ready(function() {

// Click handler for modal launch
    $(document).on("click", '.more-info', getGuideboxId);

    $('.modal-trigger').leanModal();

    $('#intro-content').show();

// Create dropdown select elements for form
    theMovieDb.genres.getList('',
        function (json) {
            var results = $.parseJSON(json);
            //console.log(results.genres);
            $.each(results.genres, function (index, genre) {
                var option = $('<option>').attr('class', 'genre');
                option.attr("id", " ");
                option.val(this.id);
                option.html(this.name);
                //console.log(this.name);
                $('#genre-options').append(option);
            })
            $('select').material_select(); // activates materialize select box - will not work without this code
        },
        errorCB);
    //code to get genre options from db. 
    for (i = new Date().getFullYear(); i > 1900; i--) {
        $('#year-options').append($('<option />').val(i).html(i));
    }
    //code to populate years

    // record changes to Movie/TV Slider
    $('.lookup').change(function () {
        if ($('.lookup').val() === 'on') {
            $('.lookup').val('off');
        }
        else {
            $('.lookup').val('on');
        }
    });

    // click handler for search button
    $('#search').click(function () {

        $('#search-results-collection').empty();
        $('#intro-content').hide();
        $('#search-results').show();

        var lookup = $('.lookup').val(); // slider to determine if search is for movies or TV
        var review = ($('#review').val());
        var date = ($('#start-date').val());
        // console.log(date);
        var year = moment(date).format('YYYY');
        // console.log(year);
        var title = $.trim($('#search-text').val());

        $('.results-title').html('<h4>Search Results for "' + title + '"</h4>');

        $('#search-text').val('');


        //console.log(title);
        //create variables with search parameters
        // theMovieDb.discover.getMovies({language: "eng",review: review, title: title }, successCB, errorCB);
        //code to discover movies

       // theMovieDb.search.getMovie({ language: "eng", review: review, query: title},
        //search code for movies

        if (lookup === 'on') {
            theMovieDb.discover.getMovies({ language: "eng", review: review, primary_release_date: year},
                function (json) {
                    var movieResults = $.parseJSON(json);
                    $('.group-results').html();
                    $.each(movieResults.results, function (index, movieResult) {
                          console.log(movieResult);
                        console.log(this.name, this.id, this.poster_path, this.first_air_date, this.overview, this.vote_average);
                        var tvResults = $('#results-clone').clone();
                        tvResults.attr("id", "");
                        var tvResultsModal = $('#modal-clone').clone();
                        tvResultsModal.attr("id", "");
                        tvResults[0].querySelector('.results-header').innerHTML = this.title;
                        tvResults[0].querySelector('.overview').innerHTML = this.overview;
                        $('.group-results').append(tvResults);

                    })
                },
            errorCB
            );

        }

        else {
            theMovieDb.discover.getTvShows({
                    language: "eng",
                    title: title,
                    first_air_date_year: year
                },
                function (json) {
                    var movieResults = $.parseJSON(json);
                    $('.group-results').html('');
                    $.each(movieResults.results, function (index, movieResult) {
                        //  console.log(movieResult);
                        console.log(this.name, this.id, this.poster_path, this.first_air_date, this.overview, this.vote_average);
                        var tvResults = $('#results-clone').clone();
                        tvResults.attr("id", "");
                        var tvResultsModal = $('#modal-clone').clone();
                        tvResultsModal.attr("id", "");
                        tvResults[0].querySelector('.results-header').innerHTML = this.name;
                        tvResults[0].querySelector('.overview').innerHTML = this.overview;
                        tvResultsModal[0].querySelector('.movie-poster').src = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.poster_path;
                        $('.group-results').append(tvResults);
                      //  $('.group-results').append(tvResultsModal);

                    })
                    $('.modal-trigger').leanModal();
                },
                errorCB
            );
        }
    });

    function outputSearchMovie(results) {
        // create item for search results collection
        resultsItem = $('<li>').attr('id', results.id);
        if (results.release_date) {
            releaseYear = ' (' +moment(results.release_date).format("YYYY") + ')';
        }
        else {
            releaseYear = '';
        }
        $(resultsItem).html('<div class="collapsible-header"><i class="material-icons deep-orange-text darken-4-text">new_releases</i>' + results.title + releaseYear + '</div>')

        itemBodyDiv = $('<div>').attr("class", "collapsible-body white-text").html("<p>" + results.overview + "</p>");
        moreInfo = $('<a>').attr("class", "modal-trigger center-align more-info waves-effect").attr("href", "#modal-" + results.id).attr("data-id", results.id);
        $(moreInfo).html("More Info");

        $(itemBodyDiv).append(moreInfo);
        $(resultsItem).append(itemBodyDiv);

        modalDiv = $('<div>').attr("id", "modal-" + results.id).attr("class", "modal");

        modalContentDiv = $('<div>').attr("class", "modal-content").html("<h4>" + results.title + "</h4>");

        if (results.poster_path !== null) {
            modalImage = $('<img>').attr('class', 'movie-poster').attr('src', 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + results.poster_path);
            $(modalContentDiv).append(modalImage);
        }
        $(modalContentDiv).append('<p class="description">' + results.overview + '</p>');

        if (results.release_date !== '') {
            $(modalContentDiv).append('<p class="releaseDate"><strong>Release Date:</strong> ' + moment(results.release_date).format("M/D/YYYY") + '</p>');
        }
        $(modalContentDiv).append('<p class="voteAverage"><strong>Rating:</strong> ' + results.vote_average + ' / 10</p>');

        $(modalDiv).html(modalContentDiv);

        genreDiv = $('<div>').attr("class", "modal-genre");
        $(modalContentDiv).append(genreDiv);

        directorsDiv = $('<div>').attr("class", "modal-directors");
        $(modalContentDiv).append(directorsDiv);

        castDiv = $('<div>').attr("class", "modal-cast");
        $(modalContentDiv).append(castDiv);

        trailerDiv = $('<div>').attr("class", "modal-trailer");
        $(modalContentDiv).append(trailerDiv);

        purchaseWebDiv = $('<div>').attr("class", "modal-purchaseWeb");
        $(modalContentDiv).append(purchaseWebDiv);

        streamWebDiv = $('<div>').attr("class", "modal-streamWeb");
        $(modalContentDiv).append(streamWebDiv);

        freeStreamWebDiv = $('<div>').attr("class", "modal-freeStreamWeb");
        $(modalContentDiv).append(freeStreamWebDiv);


        $(resultsItem).append(modalDiv);
        // write each item to collection
        $('#search-results-collection').append(resultsItem);
        // activate modal
        $('.modal-trigger').leanModal();

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

        modalDiv = $('<div>').attr("id", "modal-" + results.id).attr("class", "modal");

        modalContentDiv = $('<div>').attr("class", "modal-content").html("<h4>" + results.title + "</h4>");

        if (results.poster_path !== null) {
            modalImage = $('<img>').attr('class', 'movie-poster').attr('src', 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + results.poster_path);
            $(modalContentDiv).append(modalImage);
        }
        $(modalContentDiv).append('<p class="description">' + results.overview + '</p>');

        if (results.release_date !== '') {
            $(modalContentDiv).append('<p class="releaseDate">Release Date: ' + moment(results.release_date).format("M/D/YYYY") + '</p>');
        }
        $(modalContentDiv).append('<p class="voteAverage">Rating: ' + results.vote_average + '</p>');

        $(modalDiv).html(modalContentDiv);

        genreDiv = $('<div>').attr("class", "modal-genre");
        $(modalContentDiv).append(genreDiv);

        directorsDiv = $('<div>').attr("class", "modal-directors");
        $(modalContentDiv).append(directorsDiv);

        castDiv = $('<div>').attr("class", "modal-cast");
        $(modalContentDiv).append(castDiv);

        trailerDiv = $('<div>').attr("class", "modal-trailer");
        $(modalContentDiv).append(trailerDiv);


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

                $('.modal-cast').empty();
                $('.modal-trailer').empty();
                $('.modal-genre').empty();
                $('.modal-purchaseWeb').empty();
                $('.modal-directors').empty();
                $('.modal-streamWeb').empty();

                if (guideboxID) {
                    getExtendedInfo(guideboxID);
                }
        }); 
    }


    function getExtendedInfo(id) {
        //Get extended info for a Movie or Episode from Guidebox and output to modal
        var queryURL = "http://api-public.guidebox.com/v1.43/US/rKwkNTh5aiZK8KPTmhj7bdYPhqvJRg0q/movie/" + id; // search API
        castArray =[];
        genreArray = [];
        purchaseWebArray = [];
        directorsArray = [];
        streamWebArray = [];
        freeStreamWebArray = [];
                
        $.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {
                var extendedResults = response;

                if (extendedResults.trailers.web.length > 0) {
                    $('.modal-trailer').html('<p><strong>Trailer:</strong></p>  <iframe width="320" height="180" src="' + extendedResults.trailers.web[0].embed + '&width=320&height=180" frameborder="0" allowfullscreen></iframe>');
                }

                directors = extendedResults.directors;
                for (i=0; i < directors.length; i++) {
                    directorName = " " + directors[i].name;
                    directorsArray.push(directorName);
                }

                $('.modal-directors').html("<p><strong>Director:</strong> " + directorsArray + "</p>");

                cast = extendedResults.cast;
                for (i=0; i < cast.length; i++) {
                    castName = " " + cast[i].name;
                    castArray.push(castName);
                }

                $('.modal-cast').html("<p><strong>Cast:</strong> " + castArray + "</p>");

                genres = extendedResults.genres;
                for (i=0; i < genres.length; i++) {
                    genreName = " " + genres[i].title;
                    genreArray.push(genreName);
                }

                $('.modal-genre').html("<p><strong>Genre:</strong> " + genreArray + "</p>");

                if (extendedResults.purchase_web_sources.length > 0) {
                    purchaseWeb = extendedResults.purchase_web_sources;
                    for (i=0; i < purchaseWeb.length; i++) {
                        purchaseWebName = " " + purchaseWeb[i].display_name;
                        purchaseWebLink = purchaseWeb[i].link;
                        purchaseWebObject = '<a href="' + purchaseWebLink + '"</a>' + purchaseWebName + '</a>';
                        purchaseWebArray.push(purchaseWebObject);
                    }
                    $('.modal-purchaseWeb').html("<p><strong>Rent or Buy:</strong> " + purchaseWebArray + "</p>");
                }

                if (extendedResults.tv_everywhere_web_sources.length > 0) {
                    streamWeb = extendedResults.tv_everywhere_web_sources;
                    for (i=0; i < streamWeb.length; i++) {
                        streamWebName = " " + streamWeb[i].display_name;
                        streamWebLink = streamWeb[i].link;
                        streamWebObject = '<a href="' + streamWebLink + '"</a>' + streamWebName + '</a>';
                        streamWebArray.push(streamWebObject);
                    }
                    $('.modal-streamWeb').html("<p><strong>Stream:</strong> " + streamWebArray + "</p>");
                }

                if (extendedResults.free_web_sources.length > 0) {
                    freeStreamWeb = extendedResults.free_web_sources;
                    for (i=0; i < freeStreamWeb.length; i++) {
                        freeStreamWebName = " " + freeStreamWeb[i].display_name;
                        freeStreamWebLink = freeStreamWeb[i].link;
                        freeStreamWebObject = '<a href="' + freeStreamWebLink + '"</a>' + freeStreamWebName + '</a>';
                        freeStreamWebArray.push(freeStreamWebObject);
                    }
                    $('.modal-freeStreamWeb').html("<p><strong>Stream for free:</strong> " + freeStreamWebArray + "</p>");
                }
        });
    
    }
      
});