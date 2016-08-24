/**
 * miniMapKnowBest.js: Creates map for drawing places people know in a neighborhood that's not their's
 */

function miniMapKnowBest() {}

miniMapKnowBest.initialize = function () {

    miniMapKnowBest.map = new L.Map('miniSpendTimeMap', {
		minZoom:11,
		maxZoom:18,
    	center: [40.710508, -73.943825],
   	 	zoom: 13,
   	 	zoomControl: false
	});

	// add zoom control to lower right
	new L.Control.Zoom({ position: 'bottomright' }).addTo(miniMapKnowBest.map);

	// get bounds and set maxBounds so user can't pan outside of a certain extent
	var bounds = miniMapKnowBest.map.getBounds().pad(1);
	miniMapKnowBest.map.setMaxBounds(bounds);

	// set a tile layer to be CartoDB tiles 
	var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', { attribution: 'Map tiles by <a href=\"http://cartodb.com/attributions#basemaps\">CartoDB</a>, under <a href=\"https://creativecommons.org/licenses/by/3.0/\" target=\"_blank\">CC BY 3.0</a>. Data by <a href=\"http://www.openstreetmap.org/\" target=\"_blank\">OpenStreetMap</a>, under ODbL.'
	});


	// add these tiles to our map
	miniMapKnowBest.map.addLayer(CartoDBTiles);
	
    // enable events
    miniMapKnowBest.map.doubleClickZoom.enable();
    miniMapKnowBest.map.scrollWheelZoom.enable();

    // load drawings if they exist
    miniMapKnowBest.loadDrawnGeojson();
	
}

miniMapKnowBest.loadDrawnGeojson = function (){
	$.ajax({
		type: "GET",
		url: "/getknowbestplaces/"+ objectID +"/",
		success: function(data){
			// load the draw tools
			if (data) {

				var geojson = L.geoJson(JSON.parse(data));
				var center;
				geojson.eachLayer(function(layer) {

					var lat = layer.feature.geometry.coordinates[1];
					var lon = layer.feature.geometry.coordinates[0];

					console.log(layer.feature.properties.selected);
					if (layer.feature.properties.selected) {
						var icon = mapKnowBest.setSelectedIconBasedOnZoom();
						var selected = true;
						center = [lat, lon];
					} else {
						var icon = mapKnowBest.setIconBasedOnZoom();
						var selected = false;
					}

					var newCircle = L.marker([lat, lon], {
						icon: icon,
						riseOnHover: true,
						selected: selected,
					}).addTo(miniMapKnowBest.map);

					// set up listener for zoomend
					miniMapKnowBest.map.on('zoomend', function(e){
						if (newCircle.options.selected) {
							var icon = miniMapKnowBest.setSelectedIconBasedOnZoom();
						} else {
							var icon = miniMapKnowBest.setIconBasedOnZoom();
						}
						newCircle.setIcon(icon);
					});

				});		

				console.log(center);
				miniMapKnowBest.map.setView(center, 15);

			} 
        }
	});

}


miniMapKnowBest.setIconBasedOnZoom = function () {
	// set icon size based on zoom level
	var zoom = miniMapKnowBest.map.getZoom();
	if (zoom > 17) {
		return miniMapKnowBest.circleIcon18;
	} else if (zoom > 16) {
		return miniMapKnowBest.circleIcon17;			
	} else if (zoom > 15) {
		return miniMapKnowBest.circleIcon16;			
	} else if (zoom > 14) {
		return miniMapKnowBest.circleIcon15;			
	} else if (zoom > 13) {
		return miniMapKnowBest.circleIcon14;			
	} else if (zoom > 12) {
		return miniMapKnowBest.circleIcon13;			
	} else if (zoom > 12) {
		return miniMapKnowBest.circleIcon12;			
	} else {
		return miniMapKnowBest.circleIcon11;						
	}
}

miniMapKnowBest.setSelectedIconBasedOnZoom = function () {
	// set icon size based on zoom level
	var zoom = miniMapKnowBest.map.getZoom();
	if (zoom > 17) {
		return miniMapKnowBest.circleIconSelected18;
	} else if (zoom > 16) {
		return miniMapKnowBest.circleIconSelected17;			
	} else if (zoom > 15) {
		return miniMapKnowBest.circleIconSelected16;			
	} else if (zoom > 14) {
		return miniMapKnowBest.circleIconSelected15;			
	} else if (zoom > 13) {
		return miniMapKnowBest.circleIconSelected14;			
	} else if (zoom > 12) {
		return miniMapKnowBest.circleIconSelected13;			
	} else if (zoom > 12) {
		return miniMapKnowBest.circleIconSelected12;			
	} else {
		return miniMapKnowBest.circleIconSelected11;						
	}
}


/* Style states */
/* non-selected circles */
miniMapKnowBest.circleIcon18 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [1000, 1000], 
    iconAnchor:   [500, 500],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIcon17 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [500, 500], 
    iconAnchor:   [250, 250],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIcon16 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [225, 225], 
    iconAnchor:   [112, 112],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIcon15 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [110, 110], 
    iconAnchor:   [55, 55],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIcon14 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [60, 60], 
    iconAnchor:   [30, 30],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIcon13 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [30, 30], 
    iconAnchor:   [15, 15],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIcon12 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [18, 18], 
    iconAnchor:   [9, 9],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIcon11 = L.icon({
    iconUrl: '/static/website/css/images/circleIcon.png',
    iconSize:     [8, 8], 
    iconAnchor:   [4, 4],
    labelAnchor:  [0, 0],
});

/* selected circles */
miniMapKnowBest.circleIconSelected18 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [1000, 1000], 
    iconAnchor:   [500, 500],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIconSelected17 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [500, 500], 
    iconAnchor:   [250, 250],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIconSelected16 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [225, 225], 
    iconAnchor:   [112, 112],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIconSelected15 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [110, 110], 
    iconAnchor:   [55, 55],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIconSelected14 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [60, 60], 
    iconAnchor:   [30, 30],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIconSelected13 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [30, 30], 
    iconAnchor:   [15, 15],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIconSelected12 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [18, 18], 
    iconAnchor:   [9, 9],
    labelAnchor:  [0, 0],
});

miniMapKnowBest.circleIconSelected11 = L.icon({
    iconUrl: '/static/website/css/images/circleIconSelected.png',
    iconSize:     [8, 8], 
    iconAnchor:   [4, 4],
    labelAnchor:  [0, 0],
});




/* Vars */
miniMapKnowBest.map;

