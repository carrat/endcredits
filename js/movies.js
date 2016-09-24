function successCB(data) {
    //   console.log("Success callback: " + data);
};

function errorCB(data) {
    //   console.log("Error callback: " + data);
};

 
   

$(document).ready(function() {

// Click handler for modal launch
    $(document).on("click", '.more-info', getGuideboxId);

    $(document).on("click", '.more-info-tv', getGuideboxIdTV);

    $('.modal-trigger').leanModal();

    $('#intro-content').show();

    $('.reset-search').on("click", function() {

        $('#search-results').hide();
    });

     $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });





  

// Create dropdown select elements for form
    theMovieDb.genres.getList('',
        function (json) {
            var results = $.parseJSON(json);
            //console.log(results.genres);
            $.each(results.genres, function (index, genre) {
                var option = $('<option>').attr('class', 'genre');
                option.attr("id", " ");
                option.attr("data-label", this.name);
                option.val(this.id);
                option.html(this.name);
                console.log(this.id);
                console.log(this.name);
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
        var year = ($('#year-options').val());

        // console.log(date);
       

        // console.log(year);
        var title = encodeURIComponent($.trim($('#search-text').val()));
        var genre = $('#genre-options').val();
        var genreName = $('.genre').attr('data-label');

        console.log("Genre: " + genre);
        console.log("Year: " + year);


        $('#search-text').val('');


        //console.log(title);
        //create variables with search parameters
        // theMovieDb.discover.getMovies({language: "eng",review: review, title: title }, successCB, errorCB);
        //code to discover movies

        if (lookup === 'on') {
            if (title === '')
            {

                theMovieDb.discover.getMovies({
                        language: "en-US",
                        with_genres: genre,
                        primary_release_year: year},
                    function (json) {
                        var movieResults = $.parseJSON(json);
                       console.log(movieResults);
                       $.each(movieResults, function (index, movieResult) {
                            if ($.isEmptyObject(movieResult) == false) {
                                $.each(movieResult, function (index, movie) {
                                    console.log(this.title, this.id, this.poster_path, this.release_date, this.overview, this.vote_average);
                                    outputSearchMovie(movie);
                                });
                            }
                        })
                    },
                    errorCB
                );
            }
            else {

                $('.results-title').html('<h4>Search Results for "' + title + '"</h4>');
                 theMovieDb.search.getMovie({
                         language: "eng",
                         review: review,
                         query: title},  function (json) {
                         var movieResults = $.parseJSON(json);
                         $.each(movieResults, function (index, movieResult) {
                            if ($.isEmptyObject(movieResult) == false) {
                                $.each(movieResult, function (index, movie) {
                                    console.log(this.title, this.id, this.poster_path, this.release_date, this.overview, this.vote_average);
                                    outputSearchMovie(movie);
                                });
                            }
                        })
                     },
                     errorCB
                 );
            }
        }

        else {
            if (title === '') {
                theMovieDb.discover.getTvShows({
                        language: "eng",
                        with_genres: genre,
                        first_air_date_year: year

                    },
                    function (json) {
                        var movieResults = $.parseJSON(json);
                       
                       $.each(movieResults, function (index, movieResult) {
                            if ($.isEmptyObject(movieResult) == false) {
                                $.each(movieResult, function (index, movie) {
                                    console.log(movie);
                                    console.log(this.name, this.id, this.poster_path, this.release_date, this.overview, this.vote_average);
                                    outputSearchTV(movie);
                                });
                            }
                        })
                    },
                    errorCB
                );
            }
            else {

                $('.results-title').html('<h4>Search Results for "' + title + '"</h4>');
                theMovieDb.search.getTv({
                     //   language: "eng",
                        query: title,
                        first_air_date_year: year
                    },
                    function (json) {
                        var movieResults = $.parseJSON(json);
                        $.each(movieResults, function (index, movieResult) {
                            if ($.isEmptyObject(movieResult) == false) {
                                $.each(movieResult, function (index, movie) {
                                    console.log(this.title, this.id, this.poster_path, this.release_date, this.overview, this.vote_average);
                                    outputSearchTV(movie);
                                });
                            }
                        })
                    },
                    errorCB
                );
            }
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
        if (results.first_air_date) {
            releaseYear = ' (' +moment(results.first_air_date).format("YYYY") + ')';
        }
        else {
            releaseYear = '';
        }
        $(resultsItem).html('<div class="collapsible-header"><i class="material-icons deep-orange-text darken-4-text">new_releases</i>' + results.name + releaseYear + '</div>')

        itemBodyDiv = $('<div>').attr("class", "collapsible-body white-text").html("<p>" + results.overview + "</p>");
        moreInfo = $('<a>').attr("class", "modal-trigger center-align more-info-tv waves-effect").attr("href", "#modal-" + results.id).attr("data-id", results.id);
        $(moreInfo).html("More Info");

        $(itemBodyDiv).append(moreInfo);
        $(resultsItem).append(itemBodyDiv);

        modalDiv = $('<div>').attr("id", "modal-" + results.id).attr("class", "modal");
        modalContentDiv = $('<div>').attr("class", "modal-content").html("<h4>" + results.name + "</h4>");

        if (results.poster_path !== null) {
            modalImage = $('<img>').attr('class', 'movie-poster').attr('src', 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + results.poster_path);
            $(modalContentDiv).append(modalImage);
        }
        $(modalContentDiv).append('<p class="description">' + results.overview + '</p>');

        networkDiv = $('<div>').attr("class", "modal-network");
        $(modalContentDiv).append(networkDiv);

        genreDiv = $('<div>').attr("class", "modal-genre");
        $(modalContentDiv).append(genreDiv);

        if (results.first_air_date !== '') {
            $(modalContentDiv).append('<p class="releaseDate"><strong>First Air Date:</strong> ' + moment(results.first_air_date).format("M/D/YYYY") + '</p>');
        }

        lastAirDiv = $('<div>').attr("class", "modal-lastAir");
        $(modalContentDiv).append(lastAirDiv);

        statusDiv = $('<div>').attr("class", "modal-status");
        $(modalContentDiv).append(statusDiv);

        seasonsDiv = $('<div>').attr("class", "modal-seasons");
        $(modalContentDiv).append(seasonsDiv);

        episodesDiv = $('<div>').attr("class", "modal-episodes");
        $(modalContentDiv).append(episodesDiv);

        $(modalContentDiv).append('<p class="voteAverage"><strong>Rating:</strong> ' + results.vote_average + ' / 10</p>');

        castDiv = $('<div>').attr("class", "modal-cast");
        $(modalContentDiv).append(castDiv);

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
        var queryURL = "https://api-public.guidebox.com/v1.43/US/rKwkNTh5aiZK8KPTmhj7bdYPhqvJRg0q/search/movie/id/themoviedb/" + id; // search API

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
                $('.modal-network').empty();
                $('.modal-status').empty();

                if (guideboxID) {
                    getExtendedInfo(guideboxID);
                }
        }); 
    }

    function getGuideboxIdTV() {
    // get the corresponding Guidebox ID from the themovieddb ID
        
        var id = $(this).attr("data-id");
        var queryURL = "https://api-public.guidebox.com/v1.43/US/rKwkNTh5aiZK8KPTmhj7bdYPhqvJRg0q/search/id/themoviedb/" + id; // search API

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
                $('.modal-network').empty();
                $('.modal-status').empty();

                if (guideboxID) {
                    getExtendedInfoTV(id,guideboxID);
                }
        }); 
    }

    function getExtendedInfo(id) {
        //Get extended info for a Movie or Episode from Guidebox and output to modal
        var queryURL = "https://api-public.guidebox.com/v1.43/US/rKwkNTh5aiZK8KPTmhj7bdYPhqvJRg0q/movie/" + id; // search API
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

    function getExtendedInfoTV(tid, id) {
        //Get extended info for a Movie or Episode from Guidebox and output to modal
        var queryURL = "https://api-public.guidebox.com/v1.43/US/rKwkNTh5aiZK8KPTmhj7bdYPhqvJRg0q/show/" + id; // search API
        castArray =[];
        genreArray = [];
        purchaseWebArray = [];
        directorsArray = [];
        streamWebArray = [];
        freeStreamWebArray = [];
                
        $.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {
                var extendedResults = response;

                network = extendedResults.network;
                $('.modal-network').html("<p><strong>Network:</strong> " + network + "</p>");

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

                getAdditionalInfoTV(tid);
        });
    }

    function getAdditionalInfoTV(id) {
        //Get extended info for a Movie or Episode from Guidebox and output to modal
        var queryURL = "https://api.themoviedb.org/3/tv/" + id + "?api_key=5e77f6f5b66d12382807d9ab674c67e9"; // search API
                
        $.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {
                var extendedResults = response;

                console.log(extendedResults);

                var seasons = extendedResults.number_of_seasons;
                $('.modal-seasons').html("<p><strong>Seasons:</strong> " + seasons + "</p>");

                var episodes = extendedResults.number_of_episodes;
                $('.modal-episodes').html("<p><strong>Episodes:</strong> " + episodes + "</p>");

                var status = extendedResults.status;
                $('.modal-status').html("<p><strong>Status:</strong> " + status + "</p>");

                lastAir = extendedResults.last_air_date;
                $('.modal-lastAir').html("<p><strong>Last Air Date:</strong> " + moment(lastAir).format("M/D/YYYY") + "</p>");
        }); 
    }    

// These functions fill the blank page on load before any show is run
    function getTodayTV(number) { //1

        var queryURL = "https://api.themoviedb.org/3/tv/airing_today?api_key=5e77f6f5b66d12382807d9ab674c67e9"; // search API

        introDiv = $('<div>').attr("class", "hide-on-small-only");
        introTitleSpan = $('<h4>').attr("class", "white-text intro-box-title").html("TV Airing Today");
        introContentDiv = $('<div>').attr("class", "intro-box-content-"+number)

        $(introDiv).prepend(introTitleSpan);

        $('#intro-box-' + number).prepend(introDiv);
         
        $.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {

                var movieResults = response;
                $.each(movieResults, function (index, movieResult) {
                    if ($.isEmptyObject(movieResult) == false) {
                        $.each(movieResult, function (index, movie) {
                            console.log(this.name, this.id, this.poster_path, this.first_air_date, this.overview, this.vote_average);
                            outputTVPoster(movie, number);
                        });
                    }
                })
            
        }); 
    }

    function getTopRatedTV(number) { //2

        var queryURL = "https://api.themoviedb.org/3/tv/top_rated?api_key=5e77f6f5b66d12382807d9ab674c67e9"; // search API

        introDiv = $('<div>').attr("class", "hide-on-small-only");
        introTitleSpan = $('<h4>').attr("class", "white-text intro-box-title").html("Top Rated TV Shows");
        introContentDiv = $('<div>').attr("class", "intro-box-content-"+number)

        $(introDiv).prepend(introTitleSpan);

        $('#intro-box-' + number).prepend(introDiv);
                
        $.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {

                var movieResults = response;
                $.each(movieResults, function (index, movieResult) {
                    if ($.isEmptyObject(movieResult) == false) {
                        $.each(movieResult, function (index, movie) {
                            console.log(this.name, this.id, this.poster_path, this.release_date, this.overview, this.vote_average);
                            outputTVPoster(movie, number);
                        });
                    }
                })
                
        });    
    }

    function getTopRatedMovies(number) { //3

        var queryURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=5e77f6f5b66d12382807d9ab674c67e9"; // search API

        introDiv = $('<div>').attr("class", "hide-on-small-only");
        introTitleSpan = $('<h4>').attr("class", "white-text intro-box-title").html("Top Rated Movies");
        introContentDiv = $('<div>').attr("class", "intro-box-content-"+number)

        $(introDiv).prepend(introTitleSpan);

        $('#intro-box-' + number).prepend(introDiv);
                
        $.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {

                var movieResults = response;
                $.each(movieResults, function (index, movieResult) {
                    if ($.isEmptyObject(movieResult) == false) {
                        $.each(movieResult, function (index, movie) {
                            console.log(this.title, this.id, this.poster_path, this.release_date, this.overview, this.vote_average);
                            outputMoviePoster(movie, number);
                        });
                    }
                })
                
        });  
    }

    function getPopularTV(number) { //4

        var queryURL = "https://api.themoviedb.org/3/tv/popular?api_key=5e77f6f5b66d12382807d9ab674c67e9"; // search API

        introDiv = $('<div>').attr("class", "hide-on-small-only");
        introTitleSpan = $('<h4>').attr("class", "white-text intro-box-title").html("Popular TV Shows");
        introContentDiv = $('<div>').attr("class", "intro-box-content-"+number)

       $(introDiv).prepend(introTitleSpan);

        $('#intro-box-' + number).prepend(introDiv);
                
        $.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {

                var movieResults = response;
                $.each(movieResults, function (index, movieResult) {
                    if ($.isEmptyObject(movieResult) == false) {
                        $.each(movieResult, function (index, movie) {
                            console.log(this.name, this.id, this.poster_path, this.first_air_date, this.overview, this.vote_average);
                            outputTVPoster(movie, number);
                        });
                    }
                })
                
        });     
    }

    function getPopularMovies(number) { //5

        introDiv = $('<div>').attr("class", "hide-on-small-only");
        introTitleSpan = $('<h4>').attr("class", "white-text intro-box-title").html("Popular Movies");
        introContentDiv = $('<div>').attr("class", "intro-box-content-"+number)

        $(introDiv).prepend(introTitleSpan);

        $('#intro-box-' + number).prepend(introDiv);

        theMovieDb.discover.getMovies({
                        language: "en-US",
                        sort_by: "popularity.desc",
                        page: "1"},
                    function (json) {
                        var movieResults = $.parseJSON(json);
                       console.log(movieResults);
                       $.each(movieResults, function (index, movieResult) {
                            if ($.isEmptyObject(movieResult) == false) {
                                $.each(movieResult, function (index, movie) {
                                    console.log(this.title, this.id, this.poster_path, this.release_date, this.overview, this.vote_average);
                                    outputMoviePoster(movie, number);
                                });
                            }
                        })
                    },
                    errorCB
                );
        
    }

    function getMoviesByGenreAndDecade(genre, genreName, first_date, second_date, number) { //6

        genreTitle = genreName;
        firstDateTitle = moment(first_date).format("YYYY");
        secondDateTitle = moment(second_date).format("YYYY");

        introDiv = $('<div>').attr("class", "hide-on-small-only");
        introTitleSpan = $('<h4>').attr("class", "white-text intro-box-title").html(genreTitle + " Movies From " + firstDateTitle + "-" + secondDateTitle);

        $(introDiv).prepend(introTitleSpan);
        

        $('#intro-box-' + number).prepend(introDiv);

        theMovieDb.discover.getMovies({
                        'language': "en-US",
                        'with_genres': genre,
                        'primary_release_date.gte': first_date,
                        'primary_release_date.lte': second_date,
                        'sort_by': 'popularity.desc'
                    },
                    function (json) {
                        var movieResults = $.parseJSON(json);
                       console.log(movieResults);
                       $.each(movieResults, function (index, movieResult) {
                            if ($.isEmptyObject(movieResult) == false) {
                                $.each(movieResult, function (index, movie) {
                                    console.log(this.title, this.id, this.poster_path, this.release_date, this.overview, this.vote_average);
                                    outputMoviePoster(movie, number);
                                });
                            }

                        })
                    },
                    errorCB
                );
        

    }

    // get Random Integer
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

// randomly pick three of the intro content functions to run
    function runIntro() {

        var chosenArray = [];

        do {   
            randomNumber =  getRandomInt(1, 6);
   
            if ($.inArray(randomNumber, chosenArray) < 0) {
              console.log(randomNumber);
            chosenArray.push(randomNumber);
            }
        } while (chosenArray.length < 2); 

        console.log(chosenArray);
        for (i=0; i<chosenArray.length; i++) {
            var current = i + 1;
            loadIntroContent(current, chosenArray[i]);
        }
        
    }

// Write each of the intro content boxes
    function loadIntroContent(number, funN) {

        if (funN === 1) {

            console.log("Number: " + number);
            console.log("funN: " + funN);
            getTodayTV(number);

        }

        else if (funN === 2) {
            console.log("Number: " + number);
            console.log("funN: " + funN);
            getTopRatedTV(number);
        }
        

        else if (funN === 3) {
            console.log("Number: " + number);
            console.log("funN: " + funN);
            getTopRatedMovies(number);
        }

        else if (funN === 4) {
            console.log("Number: " + number);
            console.log("funN: " + funN);
            getPopularTV(number);
        }

        else if (funN === 5) {
            console.log("Number: " + number);
            console.log("funN: " + funN);
            getPopularMovies(number);
        }

        else if (funN === 6) {
            console.log("Number: " + number);
            console.log("funN: " + funN);

            firstDatesArray = ["1950-01-01", "1960-01-01", "1970-01-01", "1980-01-01", "1990-01-01", "2000-01-01", "2010-01-01"];
            secondDatesArray = ["1960-01-01", "1970-01-01", "1980-01-01", "1990-01-01", "2000-01-01", "2010-01-01", "2017-01-01"];
            var genresArray = [
                {
                'genreNumber': '28',
                'genreName': 'Action'
                },
                {
                'genreNumber': '12',
                'genreName': 'Adventure'
                },
                {
                'genreNumber': '16',
                'genreName': 'Animation'
                },
                {
                'genreNumber': '35',
                'genreName': 'Comedy'
                },
                {
                'genreNumber': '80',
                'genreName': 'Crime'
                },
                {
                'genreNumber': '99',
                'genreName': 'Documentary'
                },
                {
                'genreNumber': '18',
                'genreName': 'Drama'
                },
                {
                'genreNumber': '10751',
                'genreName': 'Family'
                },
                {
                'genreNumber': '14',
                'genreName': 'Fantasy'
                },
                {
                'genreNumber': '36',
                'genreName': 'History'
                },
                {
                'genreNumber': '27',
                'genreName': 'Horror'
                },
                {
                'genreNumber': '10402',
                'genreName': 'Music'
                },
                {
                'genreNumber': '9648',
                'genreName': 'Mystery'
                },
                {
                'genreNumber': '10749',
                'genreName': 'Romance'
                },
                {
                'genreNumber': '878',
                'genreName': 'Science Fiction'
                },
                {
                'genreNumber': '10770',
                'genreName': 'TV Movie'
                },
                {
                'genreNumber': '53',
                'genreName': 'Thriller'
                },
                {
                'genreNumber': '10752',
                'genreName': 'War'
                },
                {
                'genreNumber': '37',
                'genreName': 'Western'
                }

            ]

            randomFirstDate = getRandomInt(0, 6);
            randomGenre = getRandomInt(0, 18);

            genreNumber = genresArray[randomGenre].genreNumber;
            genreName = genresArray[randomGenre].genreName;
            first_date = firstDatesArray[randomFirstDate];
            second_date = secondDatesArray[randomFirstDate];
            getMoviesByGenreAndDecade(genreNumber, genreName, first_date, second_date, number);   
        }   
    }

    function outputMoviePoster(results, number) {

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
        $('#intro-box-collection-'+number).append(resultsItem);
        // activate modal
        $('.modal-trigger').leanModal();


    }

    function outputTVPoster(results, number) {

             // create item for search results collection
        resultsItem = $('<li>').attr('id', results.id);
        if (results.first_air_date) {
            releaseYear = ' (' +moment(results.first_air_date).format("YYYY") + ')';
        }
        else {
            releaseYear = '';
        }
        $(resultsItem).html('<div class="collapsible-header"><i class="material-icons deep-orange-text darken-4-text">new_releases</i>' + results.name + releaseYear + '</div>')

        itemBodyDiv = $('<div>').attr("class", "collapsible-body white-text").html("<p>" + results.overview + "</p>");
        moreInfo = $('<a>').attr("class", "modal-trigger center-align more-info-tv waves-effect").attr("href", "#modal-" + results.id).attr("data-id", results.id);
        $(moreInfo).html("More Info");

        $(itemBodyDiv).append(moreInfo);
        $(resultsItem).append(itemBodyDiv);

        modalDiv = $('<div>').attr("id", "modal-" + results.id).attr("class", "modal");
        modalContentDiv = $('<div>').attr("class", "modal-content").html("<h4>" + results.name + "</h4>");

        if (results.poster_path !== null) {
            modalImage = $('<img>').attr('class', 'movie-poster').attr('src', 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + results.poster_path);
            $(modalContentDiv).append(modalImage);
        }
        $(modalContentDiv).append('<p class="description">' + results.overview + '</p>');

        networkDiv = $('<div>').attr("class", "modal-network");
        $(modalContentDiv).append(networkDiv);

        genreDiv = $('<div>').attr("class", "modal-genre");
        $(modalContentDiv).append(genreDiv);

        if (results.first_air_date !== '') {
            $(modalContentDiv).append('<p class="releaseDate"><strong>First Air Date:</strong> ' + moment(results.first_air_date).format("M/D/YYYY") + '</p>');
        }

        lastAirDiv = $('<div>').attr("class", "modal-lastAir");
        $(modalContentDiv).append(lastAirDiv);

        statusDiv = $('<div>').attr("class", "modal-status");
        $(modalContentDiv).append(statusDiv);

        seasonsDiv = $('<div>').attr("class", "modal-seasons");
        $(modalContentDiv).append(seasonsDiv);

        episodesDiv = $('<div>').attr("class", "modal-episodes");
        $(modalContentDiv).append(episodesDiv);

        $(modalContentDiv).append('<p class="voteAverage"><strong>Rating:</strong> ' + results.vote_average + ' / 10</p>');

        castDiv = $('<div>').attr("class", "modal-cast");
        $(modalContentDiv).append(castDiv);

        $(modalDiv).html(modalContentDiv);

        $(resultsItem).append(modalDiv);

        // write each item to collection
        $('#intro-box-collection-'+number).append(resultsItem);
        // activate modal
        $('.modal-trigger').leanModal();

        

    }

      runIntro();


});