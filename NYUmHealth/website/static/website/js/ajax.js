/**
 * ajax.js: AJAX queries for apartment
 */

function ajaxApplication() {}

ajaxApplication.nextPickNeighborhood = function () {
	var timeout = window.setTimeout(slow, 200);
	var url = "/nextPickNeighborhood/";

	function slow() {
		$.ajax({
			type: "GET",
			url: url,
			success: function(data){
				$('#content').html(data);
				$('.fadein').fadeIn("slow");
	        }
		});
	}
}

ajaxApplication.nextDrawNeighborhood = function () {
	var timeout = window.setTimeout(slow, 200);
	var url = "/nextPickNeighborhood/";

	function slow() {
		var f = $("#pickNeighborhoodMapForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: url,
				data: f.serialize(),
				success: function(data){
					$('#content').html(data);
					$(".fadein").fadeIn("slow");
		        }
			});
		});

		//trigger form submit
		f.submit();

	}
}

ajaxApplication.nextNameNeighborhood = function () {
	var timeout = window.setTimeout(slow, 200);
	var url = "/nextDrawNeighborhood/";

	function slow() {
		var f = $("#drawNeighborhoodForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: url,
				data: f.serialize(),
				success: function(data){
					$('#content').html(data);
					$(".fadein").fadeIn("slow");
		        }
			});
		});

		//trigger form submit
		f.submit();

	}
}

ajaxApplication.nextKnowBestNeighborhood = function () {
	var timeout = window.setTimeout(slow, 200);
	var url = "/nextNameNeighborhood/";

	function slow() {
		var f = $("#nameNeighborhoodForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: url,
				data: f.serialize(),
				success: function(data){
					$('#content').html(data);
					$(".fadein").fadeIn("slow");
		        }
			});
		});

		//trigger form submit
		f.submit();

	}
}

/*ajaxApplication.nextKnowBestNeighborhood = function () {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		var f = $("#surveyQuestionsForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: "/nextSurveyQuestions/"+ objectID +"/",
				data: f.serialize(),
				success: function(data){
					$('#content').html(data);
					$(".fadein").fadeIn("slow");
		        }
			});
		});

		//trigger form submit
		f.submit();

	}
}*/

ajaxApplication.nextKnowBestPlaces = function () {
	var timeout = window.setTimeout(slow, 200);
	var url = "/nextKnowBestNeighborhood/";

	function slow() {
		var f = $("#knowBestNeighborhoodMapForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: url,
				data: f.serialize(),
				success: function(data){
					$('#content').html(data);
					$(".fadein").fadeIn("slow");
		        }
			});
		});

		//trigger form submit
		f.submit();

	}
}

ajaxApplication.nextknowBestSurveyQuestions = function () {
	var timeout = window.setTimeout(slow, 200);
	var url = "/nextKnowBestPlaces/";

	function slow() {
		var f = $("#knowBestPlacesForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: url,
				data: f.serialize(),
				success: function(data){
					$('#content').html(data);
					$(".fadein").fadeIn("slow");
		        }
			});
		});

		//trigger form submit
		f.submit();

	}
}


ajaxApplication.nextResults = function () {
	var timeout = window.setTimeout(slow, 200);
	var url = "/nextKnowBestSurveyQuestions/";

	function slow() {
		var f = $("#knowBestSurveyQuestionsForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: url,
				data: f.serialize(),
				success: function(data){
					$('#content').html(data);
					$(".fadein").fadeIn("slow");
		        }
			});
		});

		//trigger form submit
		f.submit();

	}
}






// back buttons
ajaxApplication.backNeighborhoodMap = function () {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextPickNeighborhood/",
			success: function(data){
				$('#content').html(data);
				$(".fadein").fadeIn("slow");
	        }
		});
	}
}

ajaxApplication.backDrawNeighborhoodMap = function () {
	console.log(id);
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextDrawNeighborhood/",
			success: function(data){
				$('#content').html(data);
				$(".fadein").fadeIn("slow");
	        }
		});
	}
}

ajaxApplication.backNameNeighborhood = function () {
	console.log(id);
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextNameNeighborhood/",
			success: function(data){
				$('#content').html(data);
				$(".fadein").fadeIn("slow");
	        }
		});
	}
}

/*ajaxApplication.backSurveyQuestions = function (id) {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextSurveyQuestions/"+id+"/",
			success: function(data){
				$('#content').html(data);
				$(".fadein").fadeIn("slow");
	        }
		});
	}
}*/

ajaxApplication.backKnowBestNeighborhood = function () {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextKnowBestNeighborhood/",
			success: function(data){
				$('#content').html(data);
				$(".fadein").fadeIn("slow");
	        }
		});
	}
}

ajaxApplication.backKnowBestPlaces = function () {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextKnowBestPlaces/",
			success: function(data){
				$('#content').html(data);
				$(".fadein").fadeIn("slow");
	        }
		});
	}
}

ajaxApplication.backKnowBestSurveyQuestions= function () {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextKnowBestSurveyQuestions/",
			success: function(data){
				$('#content').html(data);
				$(".fadein").fadeIn("slow");
	        }
		});
	}
}
