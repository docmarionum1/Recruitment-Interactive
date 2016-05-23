/**
 * mapWhereIGo.js: Creates map for drawing where people go in their neighborhoods
 */

function mapWhereIGo() {}

mapWhereIGo.initialize = function () {


    mapWhereIGo.map = new L.Map('map', {
		minZoom:11,
		maxZoom:18,
    	center: [40.710508, -73.943825],
   	 	zoom: 11,
   	 	zoomControl: false
	});

	// add zoom control to lower right
	new L.Control.Zoom({ position: 'bottomright' }).addTo(mapWhereIGo.map);

	// get bounds and set maxBounds so user can't pan outside of a certain extent
	var bounds = mapWhereIGo.map.getBounds().pad(1);
	mapWhereIGo.map.setMaxBounds(bounds);

	// set a tile layer to be CartoDB tiles 
	var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', { attribution: 'Map tiles by <a href=\"http://cartodb.com/attributions#basemaps\">CartoDB</a>, under <a href=\"https://creativecommons.org/licenses/by/3.0/\" target=\"_blank\">CC BY 3.0</a>. Data by <a href=\"http://www.openstreetmap.org/\" target=\"_blank\">OpenStreetMap</a>, under ODbL.'
	});


	// add these tiles to our map
	mapWhereIGo.map.addLayer(CartoDBTiles);
	
    // enable events
    mapWhereIGo.map.doubleClickZoom.enable();
    mapWhereIGo.map.scrollWheelZoom.enable();

    // load Neighborhood Tabulation Areas
    mapWhereIGo.loadNTA();
	
}

mapWhereIGo.loadNTA = function (){

	d3.json(NYC_NTA_topojson, function(data) {
		var polyTopojson = topojson.feature(data, data.objects.NYC_NTA).features;
		drawPolys(polyTopojson);
	});

	function drawPolys(polyTopojson) {
		mapWhereIGo.NTA = L.geoJson(polyTopojson, {
			onEachFeature: mapWhereIGo.onEachFeature_NTA
		});

		// load draw tools
    	mapWhereIGo.simpleDrawTools();
	}

}

mapWhereIGo.onEachFeature_NTA = function(feature,layer){
	// zoom map to the selected neighborhood
	if (feature.properties.NTAName == objectMyNeighborhood) {
		var bounds = layer.getBounds();
		mapWhereIGo.map.fitBounds(bounds);
		mapWhereIGo.zoomCenter = bounds.getCenter();
	}
}

mapWhereIGo.simpleDrawTools = function(){
	// initiate drawing tools
	mapWhereIGo.FEATURELAYER = new L.FeatureGroup();
	mapWhereIGo.map.addLayer(mapWhereIGo.FEATURELAYER);

	// create draggable marker that looks like a drawn circle
	var newCircle = L.marker(mapWhereIGo.zoomCenter, {
		icon: mapWhereIGo.circleIcon,
		draggable: true,
		riseOnHover: true,
	}).addTo(mapWhereIGo.map);

	newCircle.bindLabel("<strong>Drag me where you spend time!</strong>", { direction:'auto' });

	mapWhereIGo.FEATURELAYER.addLayer(newCircle);
   	var geojson = mapWhereIGo.FEATURELAYER.toGeoJSON();
   	$('#id_whereIGo').val(JSON.stringify(geojson));


	// set up listeners for drag end
	newCircle.on('dragend', function(e) {	
	   	// update the form field with new geojson
	   	var geojson = mapWhereIGo.FEATURELAYER.toGeoJSON();
	   	$('#id_whereIGo').val(JSON.stringify(geojson));
	});

	// set up listener for zoomend
	mapWhereIGo.map.on('zoomend', function(e){
		var zoom = mapWhereIGo.map.getZoom();
		if (zoom > 15) {
			newCircle.setIcon(mapWhereIGo.circleIconBig);
		} else if (zoom > 13) {
			newCircle.setIcon(mapWhereIGo.circleIcon);			
		} else {
			newCircle.setIcon(mapWhereIGo.circleIconSmall);						
		}
	});

}

mapWhereIGo.addAnotherCircle = function(){
	// get center of current map position
	mapWhereIGo.zoomCenter = mapWhereIGo.map.getCenter();

	// create draggable marker that looks like a drawn circle
	var newCircle = L.marker(mapWhereIGo.zoomCenter, {
		icon: mapWhereIGo.circleIcon,
		draggable: true,
		riseOnHover: true,
	}).addTo(mapWhereIGo.map);

	newCircle.bindLabel("<strong>Drag me where you spend time!</strong>", { direction:'auto' });

	mapWhereIGo.FEATURELAYER.addLayer(newCircle);
   	var geojson = mapWhereIGo.FEATURELAYER.toGeoJSON();
   	$('#id_whereIGo').val(JSON.stringify(geojson));


	// set up listeners for drag end
	newCircle.on('dragend', function(e) {
	   	// update the form field with new geojson
	   	var geojson = mapWhereIGo.FEATURELAYER.toGeoJSON();
	   	$('#id_whereIGo').val(JSON.stringify(geojson));
	});

	// set up listener for zoomend
	mapWhereIGo.map.on('zoomend', function(e){
		var zoom = mapWhereIGo.map.getZoom();
		if (zoom > 15) {
			newCircle.setIcon(mapWhereIGo.circleIconBig);
		} else if (zoom > 13) {
			newCircle.setIcon(mapWhereIGo.circleIcon);			
		} else {
			newCircle.setIcon(mapWhereIGo.circleIconSmall);						
		}
	});

}



// to be depreciated
mapWhereIGo.loadDrawTools = function(){

	// initiate drawing tools
	mapWhereIGo.FEATURELAYER = new L.FeatureGroup();
	mapWhereIGo.map.addLayer(mapWhereIGo.FEATURELAYER);

	// Initialise the draw control and pass it the FeatureGroup of editable layers
	mapWhereIGo.drawControl = new L.Control.Draw({
		draw: {
			polyline: false,
			rectangle: false,
			circle: {
				color: '#8a6d3b',
				weight: 3,
				showRadius: false,
				repeatMode: true,
			},
			marker: false,
			polygon: false,
		},
	    edit: {
	        featureGroup: mapWhereIGo.FEATURELAYER,
	        edit: true,
	        remove: true,
	    },
	});
	mapWhereIGo.map.addControl(mapWhereIGo.drawControl);

	mapWhereIGo.map.on('draw:created', function (e) {
	    // add layer to map
	    mapWhereIGo.FEATURELAYER.addLayer(e.layer);
	    mapWhereIGo.map.addLayer(e.layer);

	   	// update the form field with new geojson
	   	var geojson = mapWhereIGo.FEATURELAYER.toGeoJSON();
	   	console.log(geojson);

	   	$('#id_whereIGo').val(JSON.stringify(geojson));

	   	// remove disabled state from next button
	   	$('#nextResults').prop("disabled", false);

	});

	mapWhereIGo.map.on('draw:edited', function (e) {
	   	// update the form field with new geojson
	   	var geojson = mapWhereIGo.FEATURELAYER.toGeoJSON();

	   	$('#id_whereIGo').val(JSON.stringify(geojson));

	});

	mapWhereIGo.map.on('draw:deleted', function (e) {
	   	// update the form field with new geojson
	   	var geojson = mapWhereIGo.FEATURELAYER.toGeoJSON();

	   	$('#id_whereIGo').val(JSON.stringify(geojson));

	});	

}


/* Style states */
mapWhereIGo.circleIcon = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [103, 103], 
    iconAnchor:   [52, 52],
    labelAnchor:  [0, 0],
});

mapWhereIGo.circleIconSmall = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [33, 33], 
    iconAnchor:   [16, 16],
    labelAnchor:  [0, 0],
});

mapWhereIGo.circleIconBig = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [203, 203], 
    iconAnchor:   [102, 102],
    labelAnchor:  [0, 0],
});

/* Vars */
mapWhereIGo.map;
mapWhereIGo.zoomCenter;
mapWhereIGo.FEATURELAYER;

