/**
 * ajax.js: AJAX queries for apartment
 */

function ajaxApplication() {}

ajaxApplication.nextPickNeighborhood = function () {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextPickNeighborhood/",
			success: function(data){
				$('#content').html(data);
				$('.fadein').fadeIn("slow");
	        }
		});
	}
}

ajaxApplication.nextDrawNeighborhood = function () {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		var f = $("#pickNeighborhoodMapForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: "/nextPickNeighborhood/",
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
	function slow() {
		var f = $("#drawNeighborhoodForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: "/nextDrawNeighborhood/"+ objectID +"/",
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

ajaxApplication.nextSurveyQuestions = function () {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		var f = $("#nameNeighborhoodForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: "/nextNameNeighborhood/"+ objectID +"/",
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
}

ajaxApplication.nextKnowBestPlaces = function () {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		var f = $("#knowBestNeighborhoodMapForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: "/nextKnowBestNeighborhood/"+ objectID +"/",
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
	function slow() {
		var f = $("#knowBestPlacesForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: "/nextKnowBestPlaces/"+ objectID +"/",
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
	function slow() {
		var f = $("#knowBestSurveyQuestionsForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: "/nextKnowBestSurveyQuestions/"+ objectID +"/",
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
ajaxApplication.backNeighborhoodMap = function (id) {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextPickNeighborhood/"+id+"/",
			success: function(data){
				$('#content').html(data);
				$(".fadein").fadeIn("slow");
	        }
		});
	}
}

ajaxApplication.backDrawNeighborhoodMap = function (id) {
	console.log(id);
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextDrawNeighborhood/"+id+"/",
			success: function(data){
				$('#content').html(data);
				$(".fadein").fadeIn("slow");
	        }
		});
	}
}

ajaxApplication.backNameNeighborhood = function (id) {
	console.log(id);
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextNameNeighborhood/"+id+"/",
			success: function(data){
				$('#content').html(data);
				$(".fadein").fadeIn("slow");
	        }
		});
	}
}

ajaxApplication.backSurveyQuestions = function (id) {
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
}

ajaxApplication.backKnowBestNeighborhood = function (id) {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextKnowBestNeighborhood/"+id+"/",
			success: function(data){
				$('#content').html(data);
				$(".fadein").fadeIn("slow");
	        }
		});
	}
}

ajaxApplication.backKnowBestPlaces = function (id) {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextKnowBestPlaces/"+id+"/",
			success: function(data){
				$('#content').html(data);
				$(".fadein").fadeIn("slow");
	        }
		});
	}
}

ajaxApplication.backKnowBestSurveyQuestions= function (id) {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		$.ajax({
			type: "GET",
			url: "/nextKnowBestSurveyQuestions/"+id+"/",
			success: function(data){
				$('#content').html(data);
				$(".fadein").fadeIn("slow");
	        }
		});
	}
}





