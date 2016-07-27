/**
 * mapDrawNeighborhood.js: Creates map for editing your neighborhood
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

	// clear previous data
	mapDrawNeighborhood.GEOJSON = null;
	mapDrawNeighborhood.LATLNGS = [];

    // load drawnNeighborhood if it exists, if not load the neighborhood geojson
    mapDrawNeighborhood.loadDrawnGeojson();

}


mapDrawNeighborhood.loadDrawnGeojson = function (){
	$.ajax({
		type: "GET",
		url: "/getdrawngeojson/"+ objectID +"/",
		success: function(data){
			// load the draw tools
			if (data) {
				mapDrawNeighborhood.GEOJSON = L.geoJson(JSON.parse(data), {
					style: mapDrawNeighborhood.getStyleFor_NTA,
				});
				mapDrawNeighborhood.GEOJSON.eachLayer(function(layer) {
					// create latlngs array from feature layer
					mapDrawNeighborhood.LATLNGS.push(layer.getLatLngs());
					mapDrawNeighborhood.FEATURELAYER.addLayer(layer);
				});				
				var bounds = mapDrawNeighborhood.FEATURELAYER.getBounds();
				mapDrawNeighborhood.map.fitBounds(bounds);
				mapDrawNeighborhood.zoomCenter = bounds.getCenter();

				// load draw tools
	    		mapDrawNeighborhood.loadDrawTools();

			} else {
				mapDrawNeighborhood.loadNTA();
			}
        }
	});

}


mapDrawNeighborhood.loadNTA = function (){

	d3.json(NYC_NTA_topojson, function(data) {
		var polyTopojson = topojson.feature(data, data.objects.NYC_NTA).features;
		drawPolys(polyTopojson);
	});

	function drawPolys(polyTopojson) {
		mapDrawNeighborhood.NTA = L.geoJson(polyTopojson, {
			style: mapDrawNeighborhood.getStyleFor_NTA,
			onEachFeature: mapDrawNeighborhood.onEachFeature_NTA,
		});

	    // load draw tools
	    mapDrawNeighborhood.loadDrawTools();

	}

}

mapDrawNeighborhood.onEachFeature_NTA = function(feature,layer){	
	// zoom map to the selected neighborhood
	if (feature.properties.NTAName == objectMyNeighborhood) {
		// create latlngs array from feature layer
		mapDrawNeighborhood.LATLNGS.push(layer.getLatLngs());
		var bounds = layer.getBounds();
		mapDrawNeighborhood.map.fitBounds(bounds);
		mapDrawNeighborhood.zoomCenter = bounds.getCenter();
		// add layer to featureGroup
		mapDrawNeighborhood.FEATURELAYER.addLayer(layer);
	}


	// add geojson to form field 
	mapDrawNeighborhood.GEOJSON = mapDrawNeighborhood.FEATURELAYER.toGeoJSON();
	$('#id_drawnNeighborhood').val(JSON.stringify(mapDrawNeighborhood.GEOJSON));		

}

mapDrawNeighborhood.getStyleFor_NTA = function (feature){
	return mapDrawNeighborhood.initStyle;
}


mapDrawNeighborhood.loadDrawTools = function(){

	mapDrawNeighborhood.freedraw = new L.FreeDraw({
        mode: L.FreeDraw.MODES.EDIT,
    });

    mapDrawNeighborhood.freedraw.options.setSmoothFactor(1);

	mapDrawNeighborhood.freedraw.on('markers', function getMarkers(eventData) {
		mapDrawNeighborhood.FEATURELAYER.clearLayers();
		for (var i = mapDrawNeighborhood.freedraw.polygons.length - 1; i >= 0; i--) {
			mapDrawNeighborhood.FEATURELAYER.addLayer(mapDrawNeighborhood.freedraw.polygons[i]); 
		}
		mapDrawNeighborhood.GEOJSON = mapDrawNeighborhood.FEATURELAYER.toGeoJSON();
		$('#id_drawnNeighborhood').val(JSON.stringify(mapDrawNeighborhood.GEOJSON));
    });

	mapDrawNeighborhood.map.addLayer(mapDrawNeighborhood.freedraw);

	for (var i = mapDrawNeighborhood.LATLNGS.length - 1; i >= 0; i--) {
    	mapDrawNeighborhood.freedraw.createPolygon(mapDrawNeighborhood.LATLNGS[i], true);
    }

}

/* Vars */
mapDrawNeighborhood.map;
mapDrawNeighborhood.FEATURELAYER;
mapDrawNeighborhood.GEOJSON;
mapDrawNeighborhood.LATLNGS = [];


mapDrawNeighborhood.initStyle = {
        weight: 4,
        opacity: 1,
        color: '#D7217E',
        fillOpacity: 0.5,
        fillColor: "#D7217E",
    };


