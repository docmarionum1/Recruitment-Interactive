/**
 * mapKnowBest.js: Creates map for drawing places people know in a neighborhood that's not their's
 */

function mapKnowBest() {}

mapKnowBest.initialize = function () {


    mapKnowBest.map = new L.Map('map', {
		minZoom:11,
		maxZoom:18,
    	center: [40.710508, -73.943825],
   	 	zoom: 13,
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
					if (layer.feature.properties.selected) {
						var icon = mapKnowBest.setSelectedIconBasedOnZoom();
						var selected = true;
					} else {
						var icon = mapKnowBest.setIconBasedOnZoom();
						var selected = false;
					}
					
					var newCircle = L.marker([lat, lon], {
						icon: icon,
						draggable: true,
						riseOnHover: true,
						selected: selected,
					}).addTo(mapKnowBest.map);

					newCircle.bindLabel("<strong>Drag me where you spend your time!<br />Click me if you spend most of your time here.</strong>", { direction:'auto' });

					mapKnowBest.FEATURELAYER.addLayer(newCircle);

					// set up listeners for drag end
					newCircle.on('dragend', function(e) {	
					   	// update the form field with new geojson
					   	var geojson = mapKnowBest.FEATURELAYER.toGeoJSON();
					    geojson = mapKnowBest.addSelectedPropToCircle(geojson);
					   	$('#id_knowBestPlaces').val(JSON.stringify(geojson));
					});

					// set up listener for zoomend
					mapKnowBest.map.on('zoomend', function(e){
						if (newCircle.options.selected) {
							var icon = mapKnowBest.setSelectedIconBasedOnZoom();
						} else {
							var icon = mapKnowBest.setIconBasedOnZoom();
						}
						newCircle.setIcon(icon);
					});

					//set up click listener
					newCircle.on('click', function(e) {	
						if (!this.options.selected) {
							mapKnowBest.removeSelectedFromFEATURELAYER();
							this.options.selected = true;
							var icon = mapKnowBest.setSelectedIconBasedOnZoom();
							newCircle.setIcon(icon);
						   	var geojson = mapKnowBest.FEATURELAYER.toGeoJSON();
						   	geojson = mapKnowBest.addSelectedPropToCircle(geojson);
						   	$('#id_knowBestPlaces').val(JSON.stringify(geojson));
						}
					});

				});		

				var bounds = mapKnowBest.FEATURELAYER.getBounds();
				mapKnowBest.map.fitBounds(bounds);
				mapKnowBest.zoomCenter = bounds.getCenter();



			} else {
				//mapKnowBest.loadNTA();
				mapKnowBest.zoomCenter = [40.710508, -73.943825];
				mapKnowBest.simpleDrawTools();
			}
        }
	});

}


/*mapKnowBest.loadNTA = function (){

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
}*/

mapKnowBest.simpleDrawTools = function(){
	// initiate drawing tools
	mapKnowBest.FEATURELAYER = new L.FeatureGroup();
	mapKnowBest.map.addLayer(mapKnowBest.FEATURELAYER);

	// create draggable marker that looks like a drawn circle; make the first one selected
	var icon = mapKnowBest.setSelectedIconBasedOnZoom();
	var firstCircle = L.marker(mapKnowBest.zoomCenter, {
		icon: icon,
		draggable: true,
		riseOnHover: true,
		selected: true,
	}).addTo(mapKnowBest.map);

	firstCircle.bindLabel("<strong>Drag me where you spend your time!<br />Click me if you spend most of your time here.</strong>", { direction:'auto' });

	mapKnowBest.FEATURELAYER.addLayer(firstCircle);
   	var geojson = mapKnowBest.FEATURELAYER.toGeoJSON();
   	geojson = mapKnowBest.addSelectedPropToCircle(geojson);
   	$('#id_knowBestPlaces').val(JSON.stringify(geojson));

	// set up listeners for drag end
	firstCircle.on('dragend', function(e) {	
	   	// update the form field with new geojson
	   	var geojson = mapKnowBest.FEATURELAYER.toGeoJSON();
	    geojson = mapKnowBest.addSelectedPropToCircle(geojson);
	   	$('#id_knowBestPlaces').val(JSON.stringify(geojson));
	});

	// set up listener for zoomend
	mapKnowBest.map.on('zoomend', function(e){
		if (firstCircle.options.selected) {
			var icon = mapKnowBest.setSelectedIconBasedOnZoom();
		} else {
			var icon = mapKnowBest.setIconBasedOnZoom();
		}
		firstCircle.setIcon(icon);
	});

	//set up click listener
	firstCircle.on('click', function(e) {	
		if (!this.options.selected) {
			mapKnowBest.removeSelectedFromFEATURELAYER();
			this.options.selected = true;
			var icon = mapKnowBest.setSelectedIconBasedOnZoom();
			firstCircle.setIcon(icon);
		   	var geojson = mapKnowBest.FEATURELAYER.toGeoJSON();
		   	geojson = mapKnowBest.addSelectedPropToCircle(geojson);
		   	$('#id_knowBestPlaces').val(JSON.stringify(geojson));
		}
	});

}

mapKnowBest.addSelectedPropToCircle = function(geojson){
	var layers = [];
	mapKnowBest.FEATURELAYER.eachLayer(function (layer) {
		layers.push(layer);
	});

	for (var i = geojson.features.length - 1; i >= 0; i--) {
  		if ((geojson.features[i].geometry.coordinates[1] == layers[i].getLatLng().lat) && layers[i].options.selected) {
  			geojson.features[i].properties.selected = true;
  		} else {
  			geojson.features[i].properties.selected = false;
  		}
    }

    return geojson;
}

mapKnowBest.removeSelectedFromFEATURELAYER = function(){
	var icon = mapKnowBest.setIconBasedOnZoom();
	mapKnowBest.FEATURELAYER.eachLayer(function (layer) {
		layer.options.selected = false;
		layer.setIcon(icon);
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
		selected: false,
	}).addTo(mapKnowBest.map);

	newCircle.bindLabel("<strong>Drag me where you spend your time!<br />Click me if you spend most of your time here.</strong>", { direction:'auto' });

	mapKnowBest.FEATURELAYER.addLayer(newCircle);
   	var geojson = mapKnowBest.FEATURELAYER.toGeoJSON();
   	geojson = mapKnowBest.addSelectedPropToCircle(geojson);
   	$('#id_knowBestPlaces').val(JSON.stringify(geojson));


	// set up listeners for drag end
	newCircle.on('dragend', function(e) {
	   	// update the form field with new geojson
	   	var geojson = mapKnowBest.FEATURELAYER.toGeoJSON();
	   	geojson = mapKnowBest.addSelectedPropToCircle(geojson);
	   	$('#id_knowBestPlaces').val(JSON.stringify(geojson));
	});

	// set up listener for zoomend
	mapKnowBest.map.on('zoomend', function(e){
		if (newCircle.options.selected) {
			var icon = mapKnowBest.setSelectedIconBasedOnZoom();
		} else {
			var icon = mapKnowBest.setIconBasedOnZoom();
		}
		newCircle.setIcon(icon);
	});

	//set up click listener
	newCircle.on('click', function(e) {	
		if (!this.options.selected) {
			mapKnowBest.removeSelectedFromFEATURELAYER();
			this.options.selected = true;
			var icon = mapKnowBest.setSelectedIconBasedOnZoom();
			newCircle.setIcon(icon);
		   	var geojson = mapKnowBest.FEATURELAYER.toGeoJSON();
		   	geojson = mapKnowBest.addSelectedPropToCircle(geojson);
		   	$('#id_knowBestPlaces').val(JSON.stringify(geojson));
		}
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

mapKnowBest.setSelectedIconBasedOnZoom = function () {
	// set icon size based on zoom level
	var zoom = mapKnowBest.map.getZoom();
	if (zoom > 17) {
		return mapKnowBest.circleIconSelected18;
	} else if (zoom > 16) {
		return mapKnowBest.circleIconSelected17;			
	} else if (zoom > 15) {
		return mapKnowBest.circleIconSelected16;			
	} else if (zoom > 14) {
		return mapKnowBest.circleIconSelected15;			
	} else if (zoom > 13) {
		return mapKnowBest.circleIconSelected14;			
	} else if (zoom > 12) {
		return mapKnowBest.circleIconSelected13;			
	} else if (zoom > 12) {
		return mapKnowBest.circleIconSelected12;			
	} else {
		return mapKnowBest.circleIconSelected11;						
	}
}


/* Style states */
/* non-selected circles */
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

/* selected circles */
mapKnowBest.circleIconSelected18 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [1000, 1000], 
    iconAnchor:   [500, 500],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIconSelected17 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [500, 500], 
    iconAnchor:   [250, 250],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIconSelected16 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [225, 225], 
    iconAnchor:   [112, 112],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIconSelected15 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [110, 110], 
    iconAnchor:   [55, 55],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIconSelected14 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [60, 60], 
    iconAnchor:   [30, 30],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIconSelected13 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [30, 30], 
    iconAnchor:   [15, 15],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIconSelected12 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [18, 18], 
    iconAnchor:   [9, 9],
    labelAnchor:  [0, 0],
});

mapKnowBest.circleIconSelected11 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [8, 8], 
    iconAnchor:   [4, 4],
    labelAnchor:  [0, 0],
});




/* Vars */
mapKnowBest.map;
mapKnowBest.zoomCenter;
mapKnowBest.FEATURELAYER;

