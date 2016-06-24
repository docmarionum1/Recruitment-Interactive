/**
 * mapKnowBest.js: Creates map for drawing places people know in a neighborhood that's not their's
 */

function mapKnowBest() {}

mapKnowBest.initialize = function () {


    mapKnowBest.map = new L.Map('map', {
		minZoom:11,
		maxZoom:18,
    	center: [40.710508, -73.943825],
   	 	zoom: 11,
   	 	zoomControl: false
	});

	// add zoom control to lower right
	new L.Control.Zoom({ position: 'bottomright' }).addTo(mapKnowBest.map);

	// get bounds and set maxBounds so user can't pan outside of a certain extent
	var bounds = mapKnowBest.map.getBounds().pad(1);
	mapKnowBest.map.setMaxBounds(bounds);

	// set a tile layer to be CartoDB tiles 
	var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', { attribution: 'Map tiles by <a href=\"http://cartodb.com/attributions#basemaps\">CartoDB</a>, under <a href=\"https://creativecommons.org/licenses/by/3.0/\" target=\"_blank\">CC BY 3.0</a>. Data by <a href=\"http://www.openstreetmap.org/\" target=\"_blank\">OpenStreetMap</a>, under ODbL.'
	});


	// add these tiles to our map
	mapKnowBest.map.addLayer(CartoDBTiles);
	
    // enable events
    mapKnowBest.map.doubleClickZoom.enable();
    mapKnowBest.map.scrollWheelZoom.enable();

    // load Neighborhood Tabulation Areas
    mapKnowBest.loadNTA();
	
}

mapKnowBest.loadNTA = function (){

	d3.json(NYC_NTA_topojson, function(data) {
		var polyTopojson = topojson.feature(data, data.objects.NYC_NTA).features;
		drawPolys(polyTopojson);
	});

	function drawPolys(polyTopojson) {
		mapKnowBest.NTA = L.geoJson(polyTopojson, {
			onEachFeature: mapKnowBest.onEachFeature_NTA
		});

		// load draw tools
    	mapKnowBest.simpleDrawTools();
	}

}

mapKnowBest.onEachFeature_NTA = function(feature,layer){
	// zoom map to the selected neighborhood
	if (feature.properties.NTAName == objectKnowBestNeighborhood) {
		var bounds = layer.getBounds();
		mapKnowBest.map.fitBounds(bounds);
		mapKnowBest.zoomCenter = bounds.getCenter();
	}
}

mapKnowBest.simpleDrawTools = function(){
	// initiate drawing tools
	mapKnowBest.FEATURELAYER = new L.FeatureGroup();
	mapKnowBest.map.addLayer(mapKnowBest.FEATURELAYER);

	// create draggable marker that looks like a drawn circle
	var newCircle = L.marker(mapKnowBest.zoomCenter, {
		icon: mapKnowBest.circleIcon,
		draggable: true,
		riseOnHover: true,
	}).addTo(mapKnowBest.map);

	newCircle.bindLabel("<strong>Drag me where you know best!</strong>", { direction:'auto' });

	mapKnowBest.FEATURELAYER.addLayer(newCircle);
   	var geojson = mapKnowBest.FEATURELAYER.toGeoJSON();
   	$('#id_knowBestPlaces').val(JSON.stringify(geojson));


	// set up listeners for drag end
	newCircle.on('dragend', function(e) {	
	   	// update the form field with new geojson
	   	var geojson = mapKnowBest.FEATURELAYER.toGeoJSON();
	   	$('#id_knowBestPlaces').val(JSON.stringify(geojson));
	});

	// set up listener for zoomend
	mapKnowBest.map.on('zoomend', function(e){
		var zoom = mapKnowBest.map.getZoom();
		if (zoom > 15) {
			newCircle.setIcon(mapKnowBest.circleIconBig);
		} else if (zoom > 13) {
			newCircle.setIcon(mapKnowBest.circleIcon);			
		} else {
			newCircle.setIcon(mapKnowBest.circleIconSmall);						
		}
	});

}

mapKnowBest.addAnotherCircle = function(){
	// get center of current map position
	mapKnowBest.zoomCenter = mapKnowBest.map.getCenter();

	// create draggable marker that looks like a drawn circle
	var newCircle = L.marker(mapKnowBest.zoomCenter, {
		icon: mapKnowBest.circleIcon,
		draggable: true,
		riseOnHover: true,
	}).addTo(mapKnowBest.map);

	newCircle.bindLabel("<strong>Drag me where you know best!</strong>", { direction:'auto' });

	mapKnowBest.FEATURELAYER.addLayer(newCircle);
   	var geojson = mapKnowBest.FEATURELAYER.toGeoJSON();
   	$('#id_knowBestPlaces').val(JSON.stringify(geojson));


	// set up listeners for drag end
	newCircle.on('dragend', function(e) {
	   	// update the form field with new geojson
	   	var geojson = mapKnowBest.FEATURELAYER.toGeoJSON();
	   	$('#id_knowBestPlaces').val(JSON.stringify(geojson));
	});

	// set up listener for zoomend
	mapKnowBest.map.on('zoomend', function(e){
		var zoom = mapKnowBest.map.getZoom();
		if (zoom > 15) {
			newCircle.setIcon(mapKnowBest.circleIconBig);
		} else if (zoom > 13) {
			newCircle.setIcon(mapKnowBest.circleIcon);			
		} else {
			newCircle.setIcon(mapKnowBest.circleIconSmall);						
		}
	});

}


/* Style states */
mapKnowBest.circleIcon = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [103, 103], 
    iconAnchor:   [52, 52],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIconSmall = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [33, 33], 
    iconAnchor:   [16, 16],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIconBig = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [203, 203], 
    iconAnchor:   [102, 102],
    labelAnchor:  [0, 0],
});

/* Vars */
mapKnowBest.map;
mapKnowBest.zoomCenter;
mapKnowBest.FEATURELAYER;

