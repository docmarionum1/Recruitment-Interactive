/**
 * mapPickNeighborhood.js: Creates map for selecting your neighborhood
 */

function mapPickLocation() {}

mapPickLocation.initialize = function () {

    mapPickLocation.map = new L.Map('map', {
		minZoom:10,
		maxZoom:16,
    	center: [40.710508, -73.943825],
   	 	zoom: 11,
   	 	zoomControl: false
	});

	// add zoom control to lower right
	new L.Control.Zoom({ position: 'bottomright' }).addTo(mapPickLocation.map);

	// get bounds and set maxBounds so user can't pan outside of a certain extent
	var bounds = mapPickLocation.map.getBounds().pad(1);
	mapPickLocation.map.setMaxBounds(bounds);

	// set a tile layer to be CartoDB tiles 
	var CartoDBTiles = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png', { attribution: 'Map tiles by <a href=\"http://cartodb.com/attributions#basemaps\">CartoDB</a>, under <a href=\"https://creativecommons.org/licenses/by/3.0/\" target=\"_blank\">CC BY 3.0</a>. Data by <a href=\"http://www.openstreetmap.org/\" target=\"_blank\">OpenStreetMap</a>, under ODbL.'
	});


	// add these tiles to our map
	mapPickLocation.map.addLayer(CartoDBTiles);
	
    // enable events
    mapPickLocation.map.doubleClickZoom.enable();
    mapPickLocation.map.scrollWheelZoom.enable();

    // load Neighborhood Tabulation Areas
    mapPickLocation.loadNTA();
	
}


mapPickLocation.loadNTA = function (){

	d3.json(NYC_NTA_topojson, function(data) {
		var polyTopojson = topojson.feature(data, data.objects.NYC_NTA).features;
		drawPolys(polyTopojson);
	});

	function drawPolys(polyTopojson) {
		mapPickLocation.NTA = L.geoJson(polyTopojson, {
		    style: mapPickLocation.getStyleFor_NTA,
			onEachFeature: mapPickLocation.onEachFeature_NTA,
			filter: mapPickLocation.filter_NTA,
		});
		mapPickLocation.NTA.addTo(mapPickLocation.map).bringToBack();
	}

}

mapPickLocation.filter_NTA = function(feature,layer){
	if (feature.properties.NTAName == 'park-cemetery-etc-Staten Island' || feature.properties.NTAName == 'park-cemetery-etc-Queens' || feature.properties.NTAName == 'park-cemetery-etc-Manhattan' || feature.properties.NTAName == 'park-cemetery-etc-Brooklyn' || feature.properties.NTAName == 'park-cemetery-etc-Bronx' || feature.properties.NTAName == "Airport") {
		return false;
	} else {
		return true;
	}
}

mapPickLocation.onEachFeature_NTA = function(feature,layer){	

	layer.bindLabel("<strong>" + feature.properties.NTAName + "</strong>", { direction:'auto' });
	
    layer.on('mouseover', function(ev) {
    	if (layer != mapPickLocation.lastClickedLayer) {
    		layer.setStyle(mapPickLocation.hovered);
    	}
    });
		
    layer.on('mouseout', function(ev) {
    	if (layer != mapPickLocation.lastClickedLayer) {
    		mapPickLocation.NTA.resetStyle(ev.target);
    	}
				
    });	

    layer.on('click', function(ev) {
    	// look up value in the select combo box
    	var lookup = $("#id_myNeighborhood option").filter(function() {
		    return this.text == feature.properties.NTAName; 
		});

    	// change select 2
    	$select2object.val(lookup.val()).trigger("change");

    	// check to see if any layers have been clicked and if so reset the style
    	if(mapPickLocation.lastClickedLayer){
		   mapPickLocation.NTA.resetStyle(mapPickLocation.lastClickedLayer);
		}

		// set style
		layer.setStyle(mapPickLocation.clicked);

		// bring to front
		if (!L.Browser.ie && !L.Browser.opera) {
	        layer.bringToFront();
	    }

    	// zoom to layer
		mapPickLocation.map.fitBounds(layer.getBounds().pad(0.5));

	    // assign layer clicked to lastLayerClicked for use later
	    mapPickLocation.lastClickedLayer = layer;

        // remove disable from next button
        if ($('#nextSurveyQuestions').prop("disabled")) {
            $('#nextSurveyQuestions').prop("disabled", false);
        }


    });	

}

mapPickLocation.getStyleFor_NTA = function (feature){
	return mapPickLocation.initStyle;
}

mapPickLocation.selectNeighborhood = function(NTAName) {
	if(mapPickLocation.lastClickedLayer){
		mapPickLocation.NTA.resetStyle(mapPickLocation.lastClickedLayer);
	}

	mapPickLocation.NTA.eachLayer(function (layer) { 
		if(layer.feature.properties.NTAName == NTAName) {    
			layer.setStyle(mapPickLocation.clicked);
			// zoom to layer
			mapPickLocation.map.fitBounds(layer.getBounds().pad(0.5));
			mapPickLocation.lastClickedLayer = layer;
		} 
	});
}

mapPickLocation.unSelectAllNeighborhoods = function() {
	// reset map zoom
	mapPickLocation.map.setView([40.710508, -73.943825],11);
	if(mapPickLocation.lastClickedLayer){
		mapPickLocation.NTA.resetStyle(mapPickLocation.lastClickedLayer);
	}
	mapPickLocation.lastClickedLayer = '';

}


/* Style states */
mapPickLocation.initStyle = {
        weight: 0,
        opacity: 0,
        color: '#fff',
        fillOpacity: 0,
        fillColor: "#fff",
    };

mapPickLocation.hovered = {
        weight: 1,
        opacity: 1,
        color: '#111',
        fillOpacity: 0.5,
        fillColor: "#ccc",
    };

mapPickLocation.clicked = {
		weight: 3,
		opacity: 1,
	    color: '#555',		
		fillOpacity: 0.5,
		fillColor: "#ccc",
    };


/* Vars */
mapPickLocation.map;
mapPickLocation.lastClickedLayer;




