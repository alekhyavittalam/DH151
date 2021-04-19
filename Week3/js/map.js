
    var santorini = L.icon({
        iconUrl: 'flags/santo_flag.png',
        iconSize: [40,40],
        iconAnchor: [22,94], //point of the icon which will correspond to marker's location
        popupAnchor: [-3,-76]
    });
    var paris = L.icon({
        iconUrl: 'flags/paris_flag.jpeg',
        iconSize: [40,40],
        iconAnchor: [22,94],
        popupAnchor: [-3,-76]
    });
    var colombo = L.icon({
        iconUrl: 'flags/srilanka_flag.png',
        iconSize: [40,40],
        iconAnchor: [22,94],
        popupAnchor: [-3,-76]
    });
    var london = L.icon({
        iconUrl: 'flags/london_flag.png',
        iconSize: [40,40],
        iconAnchor: [22,94],
        popupAnchor: [-3,-76]
    });
    var male = L.icon({
        iconUrl: 'flags/male_flag.png',
        iconSize: [40,40],
        iconAnchor: [22,94],
        popupAnchor: [-3,-76]
    });
    var singapore = L.icon({
        iconUrl: 'flags/singapore_flag.png',
        iconSize: [40,40],
        iconAnchor: [22,94],
        popupAnchor: [-3,-76]
    });
    var turkey = L.icon({
        iconUrl: 'flags/turkey_flag.jpeg',
        iconSize: [40,40],
        iconAnchor: [22,94],
        popupAnchor: [-3,-76]
    });
    


let cities = [
    {
        'title': 'Santorini',
        'lat': 36.3932,
        'lon': 25.4615,
        'image': '<img src="pictures/santorini.jpeg" class="image" width = "200" height = "175">',
        'description': 'Visited this gorgeous place in 2017 and want to go back!',
        'icon': santorini
    },
    {
        'title': 'Paris',
        'lat': 48.8566,
        'lon': 2.3522,
        'image': '<img src="pictures/paris.jpeg" class="image" width = "200" height = "175">',
        'description': 'Love the way the Eiffel Tower lights up at night!',
        'icon': paris
    },
    {
        'title': 'Colombo',
        'lat': 6.9271,
        'lon': 79.8612,
        'image': '<img src="pictures/colombo.jpeg" class="image" width = "200" height = "175">',
        'description': "Went for a short three day holiday during New Year's",
        'icon': colombo

    },
    {
        'title': 'London',
        'lat': 51.5074,
        'lon': -0.1278,
        'image': '<img src="pictures/london.jpeg" class="image" width = "200" height = "175">',
        'description': 'Been to this place multiple times and still love it!',
        'icon': london
    },
    {
        'title': 'Malé',
        'lat': 4.1755,
        'lon': 73.5093,
        'image': '<img src="pictures/maldives.jpeg" class="image" width = "200" height = "175">',
        'description': 'Cannot get over the beautiful coast and island. Wish I could live here!',
        'icon': male

    },
    {
        'title': 'Singapore',
        'lat': 1.3521,
        'lon': 103.8198,
        'image': '<img src="pictures/singapore.jpeg" class="image" width = "200" height = "175">',
        'description': 'Such a pretty city with so much greenery!',
        'icon': singapore
    },
    {
        'title': 'Turkey',
        'lat': 39.9334,
        'lon': 32.8597,
        'image': '<img src="pictures/turkey.jpeg" class="image" width = "200" height = "175">',
        'description': 'Loved the food and the scenic hot air balloon ride!',
        'icon': turkey
    }
]

var map = L.map('map').setView([34.0730,73.5093], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// create a feature group
let myMarkers = L.featureGroup();

// loop through data
cities.forEach(function(item, index){
    var marker = L.marker([item.lat, item.lon],{icon:cities[index].icon})
        .bindPopup(item.title + '<br>' + item.description + '<br>' + item.image);
    
    myMarkers.addLayer(marker)

    $('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.title}</div`)
});

myMarkers.addTo(map)

// define layers
let layers = {
    "Cities": myMarkers
}

// add layer control box
L.control.layers(null,layers).addTo(map)

map.fitBounds(myMarkers.getBounds())

function flyToIndex(index){
    map.flyTo([cities[index].lat,cities[index].lon],12)
    myMarkers.getLayers()[index].openPopup()
}

//Animated marker
/*
// Creating a tile layer usually involves setting the URL template for the tile images
var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	osm = L.tileLayer(osmUrl, {
	 	    maxZoom: 18,
	 	    attribution: osmAttrib
	});

// initialize the map on the "map" div with a given center and zoom
//var map1 = L.map1('map').setView([19.04469, 72.9258], 3).addLayer(osm);
map.addLayer(osm);

var plane_marker = new DriftMarker([10,10], {
        iconUrl: "pictures/plane.png", 
        draggable: true,
         title: "Resource location",
         alt: "Resource Location",
         riseOnHover: true
     }).addTo(map)

 // Script for adding marker on map click
 function onMapClick(e) {
 plane_marker.slideTo(	e.latlng, {
        duration: 2000
      });
 }
 map.on('click', onMapClick);
plane_marker.slideTo(	[20, 20], {
duration: 2000
});


import DriftMarker from "leaflet-drift-marker";
var DriftMarker=require("leaflet-drift-marker")

const plane_marker = new DriftMarker([10, 10]);

plane_marker.slideTo([20, 20], {
  duration: 2000,
  keepAtCenter: true,
});

//plane_marker.addTo(map)
*/
