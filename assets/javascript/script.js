$(document).ready(function(){
	var searchItemCount = 1;
	var currentSearch;
	var queryURL;
	var offset = 0;
	localStorage.getItem("searchItemCount") === null ? localStorage.setItem("searchItemCount", searchItemCount) : searchItemCount = localStorage.getItem("searchItemCount");
	for(i = 0; i < 16; i++){
		if(localStorage.getItem("search-item-" + i)){
			$("#search-history").append("<button class='btn btn-sm btn-primary btn-search'>" + localStorage.getItem("search-item-" + i) + "</button>");
		}
	}

	function generateGifs(currentSearch, queryURL){
		$("#gif-container").empty();
		// $("#gif-container-container").css("background-color", "#C8C8C8");
		$.ajax({
			url:queryURL,
			method:"GET"
		}).done(function(response){
			console.log(response);
			$("#nav-btn-container").css("display", "unset");
			response.data.forEach(function(element){
			$("#gif-container").append("<img title='Rating: " + element.rating + "' class='img img-thumbnail giphy-gif' data-animated='" + element.images.downsized.url + "' data-still='" + element.images.downsized_still.url + "' src='" + element.images.downsized_still.url + "' />");	
			});
			
		});
	}

	$("#submit-btn").on("click", function(){
		offset = 0;
		event.preventDefault();
		localStorage.setItem("search-item-" + searchItemCount, $("#search-bar").val());
		$("#search-history").append("<button class='btn btn-sm btn-primary btn-search'>" + localStorage.getItem("search-item-" + searchItemCount) + "</button>");
		searchItemCount < 15 ? searchItemCount++ : searchItemCount = 1;
		localStorage.setItem("searchItemCount", searchItemCount);

		// num = $("#number-search-bar").val();
		currentSearch = $("#search-bar").val();
		queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kUdEiNzB18suyRffNfQNMUjQoH96jnoM&q=" + currentSearch + "&limit=10&offset=" + offset + "&rating=PG&lang=en";
		generateGifs(currentSearch, queryURL);
		$("#search-bar").val(null);

	})

	$(document).on("click", ".giphy-gif", function(){
		var thisSource = $(this).attr("src");
		var thisStill = $(this).attr("data-still");
		var thisAnimated = $(this).attr("data-animated");
		thisSource !== thisAnimated ? $(this).attr("src", thisAnimated) : $(this).attr("src", thisStill);
		
	})

	$(document).on("click", ".btn-search", function(){
		currentSearch = $(this).text();
		queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kUdEiNzB18suyRffNfQNMUjQoH96jnoM&q=" + currentSearch + "&limit=10&offset=" + offset + "&rating=PG&lang=en";
		generateGifs(currentSearch, queryURL);
	})

	$("#btn-next").on("click", function(){
		offset = offset + 10;
		queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kUdEiNzB18suyRffNfQNMUjQoH96jnoM&q=" + currentSearch + "&limit=10&offset=" + offset + "&rating=PG&lang=en";
		generateGifs(currentSearch, queryURL);
	})

	$("#btn-previous").on("click", function(){
		offset = offset - 10;
		queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kUdEiNzB18suyRffNfQNMUjQoH96jnoM&q=" + currentSearch + "&limit=10&offset=" + offset + "&rating=PG&lang=en";
		generateGifs(currentSearch, queryURL);
	})

	$("#initial-submit-btn").on("click", function(){
		currentSearch = $("#initial-search-bar").val();
		queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kUdEiNzB18suyRffNfQNMUjQoH96jnoM&q=" + currentSearch + "&limit=10&offset=" + offset + "&rating=PG&lang=en";
		$("#initial-search-container").css("display", "none");
		$("#navbar-container").css("display", "unset");
		generateGifs(currentSearch, queryURL);
	})

	$("#main-site-link").on("click", function(){
		$("#initial-search-container").css("display", "none");
		$("#navbar-container").css("display", "unset");
	})

});