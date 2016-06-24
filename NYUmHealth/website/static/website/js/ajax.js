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

ajaxApplication.nextSurveyQuestions = function () {
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


ajaxApplication.nextWhereIGo = function () {
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


ajaxApplication.nextResults = function () {
	var timeout = window.setTimeout(slow, 200);
	function slow() {
		var f = $("#whereIGoForm");
		//create on submit listener
		f.on('submit', function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: "/nextWhereIGo/"+ objectID +"/",
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








