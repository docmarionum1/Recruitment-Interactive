/**
 * miniHoodMap.js: Creates map for editing your neighborhood
 */

function miniHoodMap() {}

miniHoodMap.initialize = function () {

    miniHoodMap.map = new L.Map('miniHoodMap', {
		minZoom:10,
		maxZoom:16,
    	center: [40.710508, -73.943825],
   	 	zoom: 11,
   	 	zoomControl: false
	});

	// add zoom control to lower right
	new L.Control.Zoom({ position: 'bottomright' }).addTo(miniHoodMap.map);

	// get bounds and set maxBounds so user can't pan outside of a certain extent
	var bounds = miniHoodMap.map.getBounds().pad(1);
	miniHoodMap.map.setMaxBounds(bounds);

	// set a tile layer to be CartoDB tiles
	var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', { attribution: 'Map tiles by <a href=\"http://cartodb.com/attributions#basemaps\">CartoDB</a>, under <a href=\"https://creativecommons.org/licenses/by/3.0/\" target=\"_blank\">CC BY 3.0</a>. Data by <a href=\"http://www.openstreetmap.org/\" target=\"_blank\">OpenStreetMap</a>, under ODbL.'
	});


	// add these tiles to our map
	miniHoodMap.map.addLayer(CartoDBTiles);

    // enable events
    miniHoodMap.map.doubleClickZoom.enable();
    miniHoodMap.map.scrollWheelZoom.enable();

    // load drawnNeighborhood if it exists, if not load the neighborhood geojson
    miniHoodMap.loadDrawnGeojson();

}


miniHoodMap.loadDrawnGeojson = function (){
	$.ajax({
		type: "GET",
		url: "/getdrawngeojson/",
		success: function(data){
			// load the draw tools
			if (data) {
				miniHoodMap.GEOJSON = L.geoJson(JSON.parse(data), {
					style: miniHoodMap.getStyleFor_NTA,
				}).addTo(miniHoodMap.map);
				var bounds = miniHoodMap.GEOJSON.getBounds();
				miniHoodMap.map.fitBounds(bounds);

			}
        }
	});

}


miniHoodMap.getStyleFor_NTA = function (feature){
	return miniHoodMap.initStyle;
}

/* Vars */
miniHoodMap.map;


miniHoodMap.initStyle = {
        weight: 4,
        opacity: 1,
        color: '#D7217E',
        fillOpacity: 0.5,
        fillColor: "#D7217E",
    };
