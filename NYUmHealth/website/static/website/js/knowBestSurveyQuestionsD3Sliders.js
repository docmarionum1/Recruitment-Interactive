/**
 * knowBestSurveyQuestionsD3Sliders.js: Creates sliders and controls for survey questions
 */

function knowBestSurveyQuestionsD3Sliders() {}

knowBestSurveyQuestionsD3Sliders.initialize = function () {

	// set values to 50 to begin
	$('#id_knowBestq1').val(50);
	$('#id_knowBestq2').val(50);
	$('#id_knowBestq3').val(50);
	$('#id_knowBestq4').val(50);
	$('#id_knowBestq5').val(50);
	$('#id_knowBestq6').val(50);
	$('#id_knowBestq7').val(50);
	$('#id_knowBestq8').val(50);
	$('#id_knowBestq9').val(50);
	$('#id_knowBestq10').val(50);

	// create slider 1
	var paramsQ1 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq1').val(parseInt(value));
					 });
	d3.select('#sliderQ1').call(paramsQ1);

	// create slider 2
	var paramsQ2 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq2').val(parseInt(value));
					 });
	d3.select('#sliderQ2').call(paramsQ2);

	// create slider 3
	var paramsQ3 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq3').val(parseInt(value));
					 });
	d3.select('#sliderQ3').call(paramsQ3);

	// create slider 4
	var paramsQ4 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq4').val(parseInt(value));
					 });
	d3.select('#sliderQ4').call(paramsQ4);

	// create slider 5
	var paramsQ5 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq5').val(parseInt(value));
					 });
	d3.select('#sliderQ5').call(paramsQ5);

	// create slider 6
	var paramsQ6 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq6').val(parseInt(value));
					 });
	d3.select('#sliderQ6').call(paramsQ6);	

	// create slider 7
	var paramsQ7 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq7').val(parseInt(value));
					 });
	d3.select('#sliderQ7').call(paramsQ7);

	// create slider 8
	var paramsQ8 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq8').val(parseInt(value));
					 });
	d3.select('#sliderQ8').call(paramsQ8);	

	// create slider 9
	var paramsQ9 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq9').val(parseInt(value));
					 });
	d3.select('#sliderQ9').call(paramsQ9);	

	// create slider 10
	var paramsQ10 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_knowBestq10').val(parseInt(value));
					 });
	d3.select('#sliderQ10').call(paramsQ10);	

}



