/**
 * map.js: Creates map for selecting exact location of apartment
 */

function surveyQuestionsD3Sliders() {}

surveyQuestionsD3Sliders.initialize = function () {

	// set values to 50 to begin
	$('#id_q1').val(50);
	$('#id_q2').val(50);
	$('#id_q3').val(50);
	$('#id_q4').val(50);
	$('#id_q5').val(50);

	// create slider 1
/*	var scaleQ1 = d3.scale.ordinal()
					.domain(["Gecko", "Webkit", "Blink", "Trident"])
					.rangePoints([0, 1], 0.5);
	var paramsQ1 = d3.slider()
					 .scale(scaleQ1)
					 .axis(d3.svg.axis().ticks(4))
					 .snap(true)
					 .value("Gecko");*/
	var paramsQ1 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q1').val(parseInt(value));
					 });
	d3.select('#sliderQ1').call(paramsQ1);

	// create slider 2
	var paramsQ2 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q2').val(parseInt(value));
					 });
	d3.select('#sliderQ2').call(paramsQ2);

	// create slider 3
	var paramsQ3 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q3').val(parseInt(value));
					 });
	d3.select('#sliderQ3').call(paramsQ3);

	// create slider 4
	var paramsQ4 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q4').val(parseInt(value));
					 });
	d3.select('#sliderQ4').call(paramsQ4);

	// create slider 4
	var paramsQ5 = d3.slider()
					 .value(50)
					 .on("slideend", function(evt, value) {
					 	// set value of input
					 	$('#id_q5').val(parseInt(value));
					 });
	d3.select('#sliderQ5').call(paramsQ5);

}



