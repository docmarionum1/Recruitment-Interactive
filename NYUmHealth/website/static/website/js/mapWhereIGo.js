/**
 * mapWhereIGo.js: Creates map for drawing where people go in their neighborhoods
 */

function mapWhereIGo() {}

mapWhereIGo.initialize = function () {
	mapWhereIGo.thismap = this;

    this.map = new L.Map('map', {
		minZoom:10,
		maxZoom:18,
    	center: [40.710508, -73.943825],
   	 	zoom: 11,
   	 	zoomControl: false
	});

	// add zoom control to lower right
	new L.Control.Zoom({ position: 'bottomright' }).addTo(this.map);

	// get bounds and set maxBounds so user can't pan outside of a certain extent
	this.bounds = this.map.getBounds().pad(1);
	this.map.setMaxBounds(this.bounds);

	// set a tile layer to be CartoDB tiles 
	var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', { attribution: 'Map tiles by <a href=\"http://cartodb.com/attributions#basemaps\">CartoDB</a>, under <a href=\"https://creativecommons.org/licenses/by/3.0/\" target=\"_blank\">CC BY 3.0</a>. Data by <a href=\"http://www.openstreetmap.org/\" target=\"_blank\">OpenStreetMap</a>, under ODbL.'
	});


	// add these tiles to our map
	this.map.addLayer(CartoDBTiles);
	
    // enable events
    this.map.doubleClickZoom.enable();
    this.map.scrollWheelZoom.enable();

    // load Neighborhood Tabulation Areas
    mapWhereIGo.loadNTA();

    // load draw tools
    mapWhereIGo.loadDrawTools();
	
}


mapWhereIGo.loadNTA = function (){

	d3.json(NYC_NTA_topojson, function(data) {
		var polyTopojson = topojson.feature(data, data.objects.NYC_NTA).features;
		drawPolys(polyTopojson);
	});

	function drawPolys(polyTopojson) {
		mapWhereIGo.lastClickedLayer;
		mapWhereIGo.NTA = L.geoJson(polyTopojson, {
			onEachFeature: mapWhereIGo.onEachFeature_NTA
		});
		// zoom map to the selected neighborhood

		//mapWhereIGo.NTA.addTo(thismap.map).bringToBack();
	}

}

mapWhereIGo.onEachFeature_NTA = function(feature,layer){
	if (feature.properties.NTAName == objectMyNeighborhood) {
		var bounds = layer.getBounds();
		mapWhereIGo.thismap.map.fitBounds(bounds);
	}
}


mapWhereIGo.loadDrawTools = function(){

	// initiate drawing tools
	mapWhereIGo.thismap.FEATURELAYER = new L.FeatureGroup();
	mapWhereIGo.thismap.map.addLayer(mapWhereIGo.thismap.FEATURELAYER);

	// Initialise the draw control and pass it the FeatureGroup of editable layers
	mapWhereIGo.thismap.drawControl = new L.Control.Draw({
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
	        featureGroup: mapWhereIGo.thismap.FEATURELAYER,
	        edit: true,
	        remove: true,
	    },
	});
	mapWhereIGo.thismap.map.addControl(mapWhereIGo.thismap.drawControl);

	mapWhereIGo.thismap.map.on('draw:created', function (e) {
	    // add layer to map
	    mapWhereIGo.thismap.FEATURELAYER.addLayer(e.layer);
	    mapWhereIGo.thismap.map.addLayer(e.layer);

	   	// update the form field with new geojson
	   	var geojson = mapWhereIGo.thismap.FEATURELAYER.toGeoJSON();
	   	console.log(geojson);

	   	$('#id_whereIGo').val(JSON.stringify(geojson));

	   	// remove disabled state from next button
	   	$('#nextResults').prop("disabled", false);

	});

	mapWhereIGo.thismap.map.on('draw:edited', function (e) {
	   	// update the form field with new geojson
	   	var geojson = mapWhereIGo.thismap.FEATURELAYER.toGeoJSON();

	   	$('#id_whereIGo').val(JSON.stringify(geojson));

	});

	mapWhereIGo.thismap.map.on('draw:deleted', function (e) {
	   	// update the form field with new geojson
	   	var geojson = mapWhereIGo.thismap.FEATURELAYER.toGeoJSON();

	   	$('#id_whereIGo').val(JSON.stringify(geojson));

	});	

}





