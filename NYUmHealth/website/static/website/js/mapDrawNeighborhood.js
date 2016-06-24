/**
 * mapDrawNeighborhood.js: Creates map for selecting your neighborhood
 */

function mapDrawNeighborhood() {}

mapDrawNeighborhood.initialize = function () {

    mapDrawNeighborhood.map = new L.Map('map', {
		minZoom:10,
		maxZoom:16,
    	center: [40.710508, -73.943825],
   	 	zoom: 11,
   	 	zoomControl: false
	});

	// add zoom control to lower right
	new L.Control.Zoom({ position: 'bottomright' }).addTo(mapDrawNeighborhood.map);

	// get bounds and set maxBounds so user can't pan outside of a certain extent
	var bounds = mapDrawNeighborhood.map.getBounds().pad(1);
	mapDrawNeighborhood.map.setMaxBounds(bounds);

	// set a tile layer to be CartoDB tiles 
	var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', { attribution: 'Map tiles by <a href=\"http://cartodb.com/attributions#basemaps\">CartoDB</a>, under <a href=\"https://creativecommons.org/licenses/by/3.0/\" target=\"_blank\">CC BY 3.0</a>. Data by <a href=\"http://www.openstreetmap.org/\" target=\"_blank\">OpenStreetMap</a>, under ODbL.'
	});


	// add these tiles to our map
	mapDrawNeighborhood.map.addLayer(CartoDBTiles);
	
    // enable events
    mapDrawNeighborhood.map.doubleClickZoom.enable();
    mapDrawNeighborhood.map.scrollWheelZoom.enable();

    // create feature group for draw tools 
	mapDrawNeighborhood.FEATURELAYER = new L.FeatureGroup();
	mapDrawNeighborhood.map.addLayer(mapDrawNeighborhood.FEATURELAYER);


    // load Neighborhood Tabulation Areas
    mapDrawNeighborhood.loadNTA();

}


mapDrawNeighborhood.loadNTA = function (){

	d3.json(NYC_NTA_topojson, function(data) {
		var polyTopojson = topojson.feature(data, data.objects.NYC_NTA).features;
		drawPolys(polyTopojson);
	});

	function drawPolys(polyTopojson) {
		mapDrawNeighborhood.NTA = L.geoJson(polyTopojson, {
			onEachFeature: mapDrawNeighborhood.onEachFeature_NTA
		});

	    // load draw tools
	    mapDrawNeighborhood.loadDrawTools();

	}

}

mapDrawNeighborhood.onEachFeature_NTA = function(feature,layer){	
	// zoom map to the selected neighborhood
	if (feature.properties.NTAName == objectMyNeighborhood) {
		var bounds = layer.getBounds();
		mapDrawNeighborhood.map.fitBounds(bounds);
		mapDrawNeighborhood.zoomCenter = bounds.getCenter();
		// add layer to featureGroup
		mapDrawNeighborhood.FEATURELAYER.addLayer(layer);
	   	var geojson = mapDrawNeighborhood.FEATURELAYER.toGeoJSON();
	   	$('#id_drawnNeighborhood').val(JSON.stringify(geojson));		
	}
}


mapDrawNeighborhood.loadDrawTools = function(){

	// Initialise the draw control and pass it the FeatureGroup of editable layers
	mapDrawNeighborhood.drawControl = new L.Control.Draw({
		draw: {
			polyline: false,
			rectangle: false,
			circle: false,
			marker: false,
			polygon: false,
		},
	    edit: {
	        featureGroup: mapDrawNeighborhood.FEATURELAYER,
	        edit: true,
	        remove: false,
	    },
	});
	mapDrawNeighborhood.map.addControl(mapDrawNeighborhood.drawControl);

	mapDrawNeighborhood.map.on('draw:edited', function (e) {
	   	// update the form field with new geojson
	   	var geojson = mapDrawNeighborhood.FEATURELAYER.toGeoJSON();
	   	$('#id_drawnNeighborhood').val(JSON.stringify(geojson));

	});

}

/* Vars */
mapDrawNeighborhood.map;
mapDrawNeighborhood.FEATURELAYER;


