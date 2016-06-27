/**
 * knowBestSurveyQuestionsD3Sliders.js: Creates sliders and controls for survey questions
 */

function knowBestSurveyQuestionsD3Sliders() {}

knowBestSurveyQuestionsD3Sliders.initialize = function () {

	// set values to knowBestq to begin
	if (knowBestq1) {
		knowBestq1 = parseInt(knowBestq1);
	} else {
		knowBestq1 = 50;
	}

	if (knowBestq2) {
		knowBestq2 = parseInt(knowBestq2);
	} else {
		knowBestq2 = 50;
	}

	if (knowBestq3) {
		knowBestq3 = parseInt(knowBestq3);
	} else {
		knowBestq3 = 50;
	}

	if (knowBestq4) {
		knowBestq4 = parseInt(knowBestq4);
	} else {
		knowBestq4 = 50;
	}

	if (knowBestq5) {
		knowBestq5 = parseInt(knowBestq5);
	} else {
		knowBestq5 = 50;
	}

	if (knowBestq6) {
		knowBestq6 = parseInt(knowBestq6);
	} else {
		knowBestq6 = 50;
	}

	if (knowBestq7) {
		knowBestq7 = parseInt(knowBestq7);
	} else {
		knowBestq7 = 50;
	}

	if (knowBestq8) {
		knowBestq8 = parseInt(knowBestq8);
	} else {
		knowBestq8 = 50;
	}

	if (knowBestq9) {
		knowBestq9 = parseInt(knowBestq9);
	} else {
		knowBestq9 = 50;
	}

	if (knowBestq10) {
		knowBestq10 = parseInt(knowBestq10);
	} else {
		knowBestq10 = 50;
	}

	$('#id_knowBestq1').val(knowBestq1);
	$('#id_knowBestq2').val(knowBestq2);
	$('#id_knowBestq3').val(knowBestq3);
	$('#id_knowBestq4').val(knowBestq4);
	$('#id_knowBestq5').val(knowBestq5);
	$('#id_knowBestq6').val(knowBestq6);
	$('#id_knowBestq7').val(knowBestq7);
	$('#id_knowBestq8').val(knowBestq8);
	$('#id_knowBestq9').val(knowBestq9);
	$('#id_knowBestq10').val(knowBestq10);

	// create slider 1
	var paramsQ1 = d3.slider()
					 .value(knowBestq1)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq1').val(parseInt(value));
					 });
	d3.select('#sliderQ1').call(paramsQ1);

	// create slider 2
	var paramsQ2 = d3.slider()
					 .value(knowBestq2)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq2').val(parseInt(value));
					 });
	d3.select('#sliderQ2').call(paramsQ2);

	// create slider 3
	var paramsQ3 = d3.slider()
					 .value(knowBestq3)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq3').val(parseInt(value));
					 });
	d3.select('#sliderQ3').call(paramsQ3);

	// create slider 4
	var paramsQ4 = d3.slider()
					 .value(knowBestq4)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq4').val(parseInt(value));
					 });
	d3.select('#sliderQ4').call(paramsQ4);

	// create slider 5
	var paramsQ5 = d3.slider()
					 .value(knowBestq5)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq5').val(parseInt(value));
					 });
	d3.select('#sliderQ5').call(paramsQ5);

	// create slider 6
	var paramsQ6 = d3.slider()
					 .value(knowBestq6)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq6').val(parseInt(value));
					 });
	d3.select('#sliderQ6').call(paramsQ6);	

	// create slider 7
	var paramsQ7 = d3.slider()
					 .value(knowBestq7)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq7').val(parseInt(value));
					 });
	d3.select('#sliderQ7').call(paramsQ7);

	// create slider 8
	var paramsQ8 = d3.slider()
					 .value(knowBestq8)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq8').val(parseInt(value));
					 });
	d3.select('#sliderQ8').call(paramsQ8);	

	// create slider 9
	var paramsQ9 = d3.slider()
					 .value(knowBestq9)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq9').val(parseInt(value));
					 });
	d3.select('#sliderQ9').call(paramsQ9);	

	// create slider 10
	var paramsQ10 = d3.slider()
					 .value(knowBestq10)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq10').val(parseInt(value));
					 });
	d3.select('#sliderQ10').call(paramsQ10);	

}



