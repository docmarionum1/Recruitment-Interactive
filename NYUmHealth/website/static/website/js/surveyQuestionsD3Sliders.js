/**
 * surveyQuestionsD3Sliders.js: Creates sliders and controls for survey questions
 */

function surveyQuestionsD3Sliders() {}

surveyQuestionsD3Sliders.initialize = function () {

	// set values to 50 to begin
	if (q1) {
		q1 = parseInt(q1);
	} else {
		q1 = 50;
	}

	if (q2) {
		q2 = parseInt(q2);
	} else {
		q2 = 50;
	}

	if (q3) {
		q3 = parseInt(q3);
	} else {
		q3 = 50;
	}

	if (q4) {
		q4 = parseInt(q4);
	} else {
		q4 = 50;
	}

	if (q5) {
		q5 = parseInt(q5);
	} else {
		q5 = 50;
	}

	if (q6) {
		q6 = parseInt(q6);
	} else {
		q6 = 50;
	}

	if (q7) {
		q7 = parseInt(q7);
	} else {
		q7 = 50;
	}

	if (q8) {
		q8 = parseInt(q8);
	} else {
		q8 = 50;
	}

	if (q9) {
		q9 = parseInt(q9);
	} else {
		q9 = 50;
	}

	if (q10) {
		q10 = parseInt(q10);
	} else {
		q10 = 50;
	}

	$('#id_q1').val(q1);
	$('#id_q2').val(q2);
	$('#id_q3').val(q3);
	$('#id_q4').val(q4);
	$('#id_q5').val(q5);
	$('#id_q6').val(q6);
	$('#id_q7').val(q7);
	$('#id_q8').val(q8);
	$('#id_q9').val(q9);
	$('#id_q10').val(q10);
	
	// create slider 1
	var paramsQ1 = d3.slider()
					 .value(q1)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q1').val(parseInt(value));
					 });
	d3.select('#sliderQ1').call(paramsQ1);

	// create slider 2
	var paramsQ2 = d3.slider()
					 .value(q2)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q2').val(parseInt(value));
					 });
	d3.select('#sliderQ2').call(paramsQ2);

	// create slider 3
	var paramsQ3 = d3.slider()
					 .value(q3)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q3').val(parseInt(value));
					 });
	d3.select('#sliderQ3').call(paramsQ3);

	// create slider 4
	var paramsQ4 = d3.slider()
					 .value(q4)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q4').val(parseInt(value));
					 });
	d3.select('#sliderQ4').call(paramsQ4);

	// create slider 5
	var paramsQ5 = d3.slider()
					 .value(q5)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q5').val(parseInt(value));
					 });
	d3.select('#sliderQ5').call(paramsQ5);

	// create slider 6
	var paramsQ6 = d3.slider()
					 .value(q6)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q6').val(parseInt(value));
					 });
	d3.select('#sliderQ6').call(paramsQ6);	

	// create slider 7
	var paramsQ7 = d3.slider()
					 .value(q7)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q7').val(parseInt(value));
					 });
	d3.select('#sliderQ7').call(paramsQ7);

	// create slider 8
	var paramsQ8 = d3.slider()
					 .value(q8)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q8').val(parseInt(value));
					 });
	d3.select('#sliderQ8').call(paramsQ8);	

	// create slider 9
	var paramsQ9 = d3.slider()
					 .value(q9)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q9').val(parseInt(value));
					 });
	d3.select('#sliderQ9').call(paramsQ9);	

	// create slider 10
	var paramsQ10 = d3.slider()
					 .value(q10)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q10').val(parseInt(value));
					 });
	d3.select('#sliderQ10').call(paramsQ10);	

}



