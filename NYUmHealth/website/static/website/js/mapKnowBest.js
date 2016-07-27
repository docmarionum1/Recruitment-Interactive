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

    // load drawings if they exist
    mapKnowBest.loadDrawnGeojson();
	
}

mapKnowBest.loadDrawnGeojson = function (){
	$.ajax({
		type: "GET",
		url: "/getknowbestplaces/"+ objectID +"/",
		success: function(data){
			// load the draw tools
			if (data) {
				// initiate drawing tools
				mapKnowBest.FEATURELAYER = new L.FeatureGroup();
				mapKnowBest.map.addLayer(mapKnowBest.FEATURELAYER);

				var geojson = L.geoJson(JSON.parse(data));
				geojson.eachLayer(function(layer) {

					var lat = layer.feature.geometry.coordinates[1]
					var lon = layer.feature.geometry.coordinates[0]

					// create draggable marker that looks like a drawn circle
					var icon = mapKnowBest.setIconBasedOnZoom();
					var newCircle = L.marker([lat, lon], {
						icon: icon,
						draggable: true,
						riseOnHover: true,
					}).addTo(mapKnowBest.map);

					newCircle.bindLabel("<strong>Drag me where you spend your time!</strong>", { direction:'auto' });

					mapKnowBest.FEATURELAYER.addLayer(newCircle);

					// set up listeners for drag end
					newCircle.on('dragend', function(e) {	
					   	// update the form field with new geojson
					   	var geojson = mapKnowBest.FEATURELAYER.toGeoJSON();
					   	$('#id_knowBestPlaces').val(JSON.stringify(geojson));
					});

					// set up listener for zoomend
					mapKnowBest.map.on('zoomend', function(e){
						var icon = mapKnowBest.setIconBasedOnZoom();
						newCircle.setIcon(icon);
					});

				});		

				var bounds = mapKnowBest.FEATURELAYER.getBounds();
				mapKnowBest.map.fitBounds(bounds);
				mapKnowBest.zoomCenter = bounds.getCenter();



			} else {
				mapKnowBest.loadNTA();
			}
        }
	});

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
	var icon = mapKnowBest.setIconBasedOnZoom();
	var newCircle = L.marker(mapKnowBest.zoomCenter, {
		icon: icon,
		draggable: true,
		riseOnHover: true,
	}).addTo(mapKnowBest.map);

	L.circle(mapKnowBest.zoomCenter, 200).addTo(mapKnowBest.map);					

	newCircle.bindLabel("<strong>Drag me where you spend your time!</strong>", { direction:'auto' });

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
		var icon = mapKnowBest.setIconBasedOnZoom();
		newCircle.setIcon(icon);
	});

}

mapKnowBest.addAnotherCircle = function(){
	// get center of current map position
	mapKnowBest.zoomCenter = mapKnowBest.map.getCenter();

	// create draggable marker that looks like a drawn circle
	var icon = mapKnowBest.setIconBasedOnZoom();
	var newCircle = L.marker(mapKnowBest.zoomCenter, {
		icon: icon,
		draggable: true,
		riseOnHover: true,
	}).addTo(mapKnowBest.map);

	newCircle.bindLabel("<strong>Drag me where you spend your time!</strong>", { direction:'auto' });

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
		var icon = mapKnowBest.setIconBasedOnZoom();
		newCircle.setIcon(icon);
	});

}

mapKnowBest.setIconBasedOnZoom = function () {
	// set icon size based on zoom level
	var zoom = mapKnowBest.map.getZoom();
	if (zoom > 17) {
		return mapKnowBest.circleIcon18;
	} else if (zoom > 16) {
		return mapKnowBest.circleIcon17;			
	} else if (zoom > 15) {
		return mapKnowBest.circleIcon16;			
	} else if (zoom > 14) {
		return mapKnowBest.circleIcon15;			
	} else if (zoom > 13) {
		return mapKnowBest.circleIcon14;			
	} else if (zoom > 12) {
		return mapKnowBest.circleIcon13;			
	} else if (zoom > 12) {
		return mapKnowBest.circleIcon12;			
	} else {
		return mapKnowBest.circleIcon11;						
	}
}


/* Style states */
mapKnowBest.circleIcon18 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [1000, 1000], 
    iconAnchor:   [500, 500],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIcon17 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [500, 500], 
    iconAnchor:   [250, 250],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIcon16 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [225, 225], 
    iconAnchor:   [112, 112],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIcon15 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [110, 110], 
    iconAnchor:   [55, 55],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIcon14 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [60, 60], 
    iconAnchor:   [30, 30],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIcon13 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [30, 30], 
    iconAnchor:   [15, 15],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIcon12 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [18, 18], 
    iconAnchor:   [9, 9],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIcon11 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [8, 8], 
    iconAnchor:   [4, 4],
    labelAnchor:  [0, 0],
});


/* Vars */
mapKnowBest.map;
mapKnowBest.zoomCenter;
mapKnowBest.FEATURELAYER;

