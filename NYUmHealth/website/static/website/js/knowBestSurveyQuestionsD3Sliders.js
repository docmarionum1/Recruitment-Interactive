/**
 * SurveyQuestionsD3Sliders.js: Creates sliders and controls for survey questions
 */

function knowBestSurveyQuestionsD3Sliders() {}

knowBestSurveyQuestionsD3Sliders.initialize = function () {

	// set values to q to begin
	if (q1) {
		q1 = parseInt(q1);
	} else {
		q1 = 0;
	}

	if (q2) {
		q2 = parseInt(q2);
	} else {
		q2 = 0;
	}

	if (q3) {
		q3 = parseInt(q3);
	} else {
		q3 = 0;
	}

	if (q4) {
		q4 = parseInt(q4);
	} else {
		q4 = 0;
	}

	if (q5) {
		q5 = parseInt(q5);
	} else {
		q5 = 0;
	}

	if (q6) {
		q6 = parseInt(q6);
	} else {
		q6 = 0;
	}

	if (q7) {
		q7 = parseInt(q7);
	} else {
		q7 = 0;
	}

	if (q8) {
		q8 = parseInt(q8);
	} else {
		q8 = 0;
	}

	if (q9) {
		q9 = parseInt(q9);
	} else {
		q9 = 0;
	}

	if (q10) {
		q10 = parseInt(q10);
	} else {
		q10 = 0;
	}

	if (q11) {
		q11 = parseInt(q11);
	} else {
		q11 = 0;
	}

	if (q12) {
		q12 = parseInt(q12);
	} else {
		q12 = 0;
	}

	if (q13) {
		q13 = parseInt(q13);
	} else {
		q13 = 0;
	}

	if (q14) {
		q14 = parseInt(q14);
	} else {
		q14 = 0;
	}

	if (q15) {
		q15 = parseInt(q15);
	} else {
		q15 = 0;
	}

	if (q16) {
		q16 = parseInt(q16);
	} else {
		q16 = 0;
	}

	if (q17) {
		q17 = parseInt(q17);
	} else {
		q17 = 0;
	}

	if (q18) {
		q18 = parseInt(q18);
	} else {
		q18 = 0;
	}

	if (q19) {
		q19 = parseInt(q19);
	} else {
		q19 = 0;
	}

	if (q20) {
		q20 = parseInt(q20);
	} else {
		q20 = 0;
	}

	if (circleq1) {
		circleq1 = parseInt(circleq1);
	} else {
		circleq1 = 0;
	}

	if (circleq2) {
		circleq2 = parseInt(circleq2);
	} else {
		circleq2 = 0;
	}

	if (circleq3) {
		circleq3 = parseInt(circleq3);
	} else {
		circleq3 = 0;
	}

	if (circleq4) {
		circleq4 = parseInt(circleq4);
	} else {
		circleq4 = 0;
	}

	if (circleq5) {
		circleq5 = parseInt(circleq5);
	} else {
		circleq5 = 0;
	}

	if (circleq6) {
		circleq6 = parseInt(circleq6);
	} else {
		circleq6 = 0;
	}

	if (circleq7) {
		circleq7 = parseInt(circleq7);
	} else {
		circleq7 = 0;
	}

	if (circleq8) {
		circleq8 = parseInt(circleq8);
	} else {
		circleq8 = 0;
	}

	if (circleq9) {
		circleq9 = parseInt(circleq9);
	} else {
		circleq9 = 0;
	}

	if (circleq10) {
		circleq10 = parseInt(circleq10);
	} else {
		circleq10 = 0;
	}

	if (circleq11) {
		circleq11 = parseInt(circleq11);
	} else {
		circleq11 = 0;
	}

	if (circleq12) {
		circleq12 = parseInt(circleq12);
	} else {
		circleq12 = 0;
	}

	if (circleq13) {
		circleq13 = parseInt(circleq13);
	} else {
		circleq13 = 0;
	}

	if (circleq14) {
		circleq14 = parseInt(circleq14);
	} else {
		circleq14 = 0;
	}

	if (circleq15) {
		circleq15 = parseInt(circleq15);
	} else {
		circleq15 = 0;
	}

	if (circleq16) {
		circleq16 = parseInt(circleq16);
	} else {
		circleq16 = 0;
	}

	if (circleq17) {
		circleq17 = parseInt(circleq17);
	} else {
		circleq17 = 0;
	}

	if (circleq18) {
		circleq18 = parseInt(circleq18);
	} else {
		circleq18 = 0;
	}

	if (circleq19) {
		circleq19 = parseInt(circleq19);
	} else {
		circleq19 = 0;
	}

	if (circleq20) {
		circleq20 = parseInt(circleq20);
	} else {
		circleq20 = 0;
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
	$('#id_q11').val(q11);
	$('#id_q12').val(q12);
	$('#id_q13').val(q13);
	$('#id_q14').val(q14);
	$('#id_q15').val(q15);
	$('#id_q16').val(q16);
	$('#id_q17').val(q17);
	$('#id_q18').val(q18);
	$('#id_q19').val(q19);
	$('#id_q20').val(q20);

	$('#id_circleq1').val(circleq1);
	$('#id_circleq2').val(circleq2);
	$('#id_circleq3').val(circleq3);
	$('#id_circleq4').val(circleq4);
	$('#id_circleq5').val(circleq5);
	$('#id_circleq6').val(circleq6);
	$('#id_circleq7').val(circleq7);
	$('#id_circleq8').val(circleq8);
	$('#id_circleq9').val(circleq9);
	$('#id_circleq10').val(circleq10);
	$('#id_circleq11').val(circleq11);
	$('#id_circleq12').val(circleq12);
	$('#id_circleq13').val(circleq13);
	$('#id_circleq14').val(circleq14);
	$('#id_circleq15').val(circleq15);
	$('#id_circleq16').val(circleq16);
	$('#id_circleq17').val(circleq17);
	$('#id_circleq18').val(circleq18);
	$('#id_circleq19').val(circleq19);
	$('#id_circleq20').val(circleq20);

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

	var paramsQ11 = d3.slider()
					 .value(q11)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q11').val(parseInt(value));
					 });
	d3.select('#sliderQ11').call(paramsQ11);	

	var paramsQ12 = d3.slider()
					 .value(q12)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q12').val(parseInt(value));
					 });
	d3.select('#sliderQ12').call(paramsQ12);	

	var paramsQ13 = d3.slider()
					 .value(q13)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q13').val(parseInt(value));
					 });
	d3.select('#sliderQ13').call(paramsQ13);	

	var paramsQ14 = d3.slider()
					 .value(q14)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q14').val(parseInt(value));
					 });
	d3.select('#sliderQ14').call(paramsQ14);	

	var paramsQ15 = d3.slider()
					 .value(q15)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q15').val(parseInt(value));
					 });
	d3.select('#sliderQ15').call(paramsQ15);	

	var paramsQ16 = d3.slider()
					 .value(q16)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q16').val(parseInt(value));
					 });
	d3.select('#sliderQ16').call(paramsQ16);	

	var paramsQ17 = d3.slider()
					 .value(q17)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q17').val(parseInt(value));
					 });
	d3.select('#sliderQ17').call(paramsQ17);	

	var paramsQ18 = d3.slider()
					 .value(q18)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q18').val(parseInt(value));
					 });
	d3.select('#sliderQ18').call(paramsQ18);	

	var paramsQ19 = d3.slider()
					 .value(q19)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q19').val(parseInt(value));
					 });
	d3.select('#sliderQ19').call(paramsQ19);	

	var paramsQ20 = d3.slider()
					 .value(q20)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q20').val(parseInt(value));
					 });
	d3.select('#sliderQ20').call(paramsQ20);	


	// create slider 1
	var paramsCircleQ1 = d3.slider()
					 .value(circleq1)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq1').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ1').call(paramsCircleQ1);

	// create slider 2
	var paramsCircleQ2 = d3.slider()
					 .value(circleq2)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq2').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ2').call(paramsCircleQ2);

	// create slider 3
	var paramsCircleQ3 = d3.slider()
					 .value(circleq3)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq3').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ3').call(paramsCircleQ3);

	// create slider 4
	var paramsCircleQ4 = d3.slider()
					 .value(circleq4)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq4').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ4').call(paramsCircleQ4);

	// create slider 5
	var paramsCircleQ5 = d3.slider()
					 .value(circleq5)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq5').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ5').call(paramsCircleQ5);

	// create slider 6
	var paramsCircleQ6 = d3.slider()
					 .value(circleq6)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq6').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ6').call(paramsCircleQ6);	

	// create slider 7
	var paramsCircleQ7 = d3.slider()
					 .value(circleq7)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq7').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ7').call(paramsCircleQ7);

	// create slider 8
	var paramsCircleQ8 = d3.slider()
					 .value(circleq8)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq8').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ8').call(paramsCircleQ8);	

	// create slider 9
	var paramsCircleQ9 = d3.slider()
					 .value(circleq9)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq9').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ9').call(paramsCircleQ9);	

	// create slider 10
	var paramsCircleQ10 = d3.slider()
					 .value(circleq10)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq10').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ10').call(paramsCircleQ10);	

	var paramsCircleQ11 = d3.slider()
					 .value(circleq11)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq11').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ11').call(paramsCircleQ11);	

	var paramsCircleQ12 = d3.slider()
					 .value(circleq12)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq12').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ12').call(paramsCircleQ12);	

	var paramsCircleQ13 = d3.slider()
					 .value(circleq13)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq13').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ13').call(paramsCircleQ13);	

	var paramsCircleQ14 = d3.slider()
					 .value(circleq14)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq14').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ14').call(paramsCircleQ14);	

	var paramsCircleQ15 = d3.slider()
					 .value(circleq15)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq15').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ15').call(paramsCircleQ15);	

	var paramsCircleQ16 = d3.slider()
					 .value(circleq16)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq16').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ16').call(paramsCircleQ16);	

	var paramsCircleQ17 = d3.slider()
					 .value(circleq17)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq17').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ17').call(paramsCircleQ17);	

	var paramsCircleQ18 = d3.slider()
					 .value(circleq18)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq18').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ18').call(paramsCircleQ18);	

	var paramsCircleQ19 = d3.slider()
					 .value(circleq19)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq19').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ19').call(paramsCircleQ19);	

	var paramsCircleQ20 = d3.slider()
					 .value(circleq20)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_circleq20').val(parseInt(value));
					 });
	d3.select('#sliderCircleQ20').call(paramsCircleQ20);	


}



