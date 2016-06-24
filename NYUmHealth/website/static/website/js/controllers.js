/**
 * controllers.js: javascript controllers for all pages
 */



$( document ).ready(function() {

	// fade in first page on page load
	$(".fadein").fadeIn("slow");

	// set listener for opening collapsed nav bar, which should toggle the top of main container
	$(document).on('click', '.navbar-toggle', function(e) {
	 	// check size of content window
	 	var topContent = $('#content').css("top");
	 	if (topContent == "67px") {
	 		// set to 170 px
	 		$('#content').css("top", "170px");
	 		$('#map').css("top", "103px");
	 	} else {
	 		// set to 65 px
	 		$('#content').css("top", "67px");
	 		$('#map').css("top", "0");	 		
	 	}
	});

	// listener for add circle button on where I go map
	$(document).on('click', '#addAnotherCircle', function(e) {
		e.preventDefault();
		mapWhereIGo.addAnotherCircle();
	});


	// listeners for all form next buttons
	$(document).on('click', '#nextPickNeighborhood', function(e) {
		$(".fadein").fadeOut("fast");
		ajaxApplication.nextPickNeighborhood();
	});

	$(document).on('click', '#nextDrawNeighborhood', function(e) {
		console.log('works?');
		e.preventDefault();
		//fade out, submit form, then fade back in
		$(".fadein").fadeOut("fast");
		ajaxApplication.nextDrawNeighborhood();
	});

	$(document).on('click', '#nextNameNeighborhood', function(e) {
		e.preventDefault();
		//fade out, submit form, then fade back in
		$(".fadein").fadeOut("fast");
		ajaxApplication.nextNameNeighborhood();
	});

	$(document).on('click', '#nextSurveyQuestions', function(e) {
		e.preventDefault();
		//fade out, submit form, then fade back in
		$(".fadein").fadeOut("fast");
		ajaxApplication.nextSurveyQuestions();
	});

	$(document).on('click', '#nextWhereIGo', function(e) {
		e.preventDefault();
		//fade out, submit form, then fade back in
		$(".fadein").fadeOut("fast");
		ajaxApplication.nextWhereIGo();
	});

	$(document).on('click', '#nextResults', function(e) {
		e.preventDefault();
		//fade out, submit form, then fade back in
		$(".fadein").fadeOut("fast");
		ajaxApplication.nextResults();
	});	
	

	// listeners for back buttons
	$(document).on('click', '#backNeighborhoodMap', function(e) {
		e.preventDefault();
		$(".fadein").fadeOut("fast");
		ajaxApplication.backNeighborhoodMap(objectID);
	});




});
