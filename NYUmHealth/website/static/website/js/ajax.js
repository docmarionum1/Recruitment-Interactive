/**
 * ajax.js: AJAX queries for apartment
 */

function ajaxApplication() {}

ajaxApplication.nextPickNeighborhood = function () {
	var timeout = window.setTimeout(slow, 200);
	if (objectID != '') {
		var url = "/nextPickNeighborhood/"+ objectID +"/";
	} else {
		var url = "/nextPickNeighborhood/";
	}
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
	if (objectID != '') {
		var url = "/nextPickNeighborhood/"+ objectID +"/";
	} else {
		var url = "/nextPickNeighborhood/";
	}
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
	if (objectID != '') {
		var url = "/nextDrawNeighborhood/"+ objectID +"/";
	} else {
		var url = "/nextDrawNeighborhood/";
	}
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
	if (objectID != '') {
		var url = "/nextNameNeighborhood/"+ objectID +"/";
	} else {
		var url = "/nextNameNeighborhood/";
	}
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
	if (objectID != '') {
		var url = "/nextKnowBestNeighborhood/"+ objectID +"/";
	} else {
		var url = "/nextKnowBestNeighborhood/";
	}
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
	if (objectID != '') {
		var url = "/nextKnowBestPlaces/"+ objectID +"/";
	} else {
		var url = "/nextKnowBestPlaces/";
	}
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
	if (objectID != '') {
		var url = "/nextKnowBestSurveyQuestions/"+ objectID +"/";
	} else {
		var url = "/nextKnowBestSurveyQuestions/";
	}
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





