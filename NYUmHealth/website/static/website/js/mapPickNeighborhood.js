/**
 * mapPickNeighborhood.js: Creates map for selecting your neighborhood
 */

function mapPickLocation() {}

mapPickLocation.initialize = function () {

    this.map = new L.Map('map', {
		minZoom:10,
		maxZoom:16,
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
    mapPickLocation.loadNTA(this);
	
}


mapPickLocation.loadNTA = function (thismap){

	d3.json(NYC_NTA_topojson, function(data) {
		var polyTopojson = topojson.feature(data, data.objects.NYC_NTA).features;
		drawPolys(polyTopojson);
	});

	function drawPolys(polyTopojson) {
		mapPickLocation.lastClickedLayer;
		mapPickLocation.NTA = L.geoJson(polyTopojson, {
		    style: mapPickLocation.getStyleFor_NTA,
			onEachFeature: mapPickLocation.onEachFeature_NTA,
			filter: mapPickLocation.filter_NTA,
		});
		mapPickLocation.NTA.addTo(thismap.map).bringToBack();
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
	var hovered = {
	    fillOpacity: 1
	};
	var notHovered = {
	    fillOpacity: 0.5
	};

	var clicked = {
		weight: 3,
		fillOpacity: 1,
	    color: '#555',
	}

	layer.bindLabel("<strong>" + feature.properties.NTAName + "</strong>", { direction:'auto' });
	
    layer.on('mouseover', function(ev) {
		layer.setStyle(hovered);
    });
		
    layer.on('mouseout', function(ev) {
    	if (layer != mapPickLocation.lastClickedLayer) {
    		mapPickLocation.NTA.resetStyle(ev.target);
    	}
				
    });	

    layer.on('click', function(ev) {
    	// check to see if any layers have been clicked and if so reset the style
    	if(mapPickLocation.lastClickedLayer){
		   mapPickLocation.NTA.resetStyle(mapPickLocation.lastClickedLayer);
		}

		// set style
		layer.setStyle(clicked);

		// bring to front
		if (!L.Browser.ie && !L.Browser.opera) {
	        layer.bringToFront();
	    }

	    // update the form for submission
	    $('#id_myNeighborhood').val(feature.properties.NTAName);

	    // remove disable from next button
	    if ($('#nextSurveyQuestions').prop("disabled")) {
	    	$('#nextSurveyQuestions').prop("disabled", false);
	    }

	    // assign layer clicked to lastLayerClicked for use later
	    mapPickLocation.lastClickedLayer = layer;

    });	

}

mapPickLocation.getStyleFor_NTA = function (feature){
	var color = d3.scale.category20()
        .domain(d3.range(195));

	return {
        weight: 1,
        opacity: 1,
        color: '#fff',
        fillOpacity: 0.5,
        fillColor: color(parseInt(feature.properties.OBJECTID))
    }		
    
}





