// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;
let path = "data/whc-sites-2019.csv"
let markers = L.featureGroup();

// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
    readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}

/*
//Layer Groups
var Cultural = new L.LayerGroup();
var Natural = new L.LayerGroup();
var Mixed = new L.LayerGroup();

//Markers
function layer(marker){
	if(marker.category == "Cultural"){
		Cultural.addLayer(marker);
	}
	if(marker.category == "Natural"){
		Natural.addLayer(marker);
	}
	else{
		Mixed.addLayer(marker);
	}
}

let layers = {
	"Cultural": Cultural,
	"Natural": Natural,
	"Mixed": Mixed
}

// add layer control box
L.control.layers(null,layers).addTo(map)
*/

function mapCSV(data){

    let circleOptions = {
        radius: 5,
        weight: 1,
        color: 'white',
        fillColor: 'dodgerblue',
        fillOpacity: 1
    }
    //loop through each entry
    data.data.forEach(function(item,index){
        let marker = L.circleMarker([item.latitude,item.longitude], circleOptions).on('mouseover',function(){
            this.bindPopup(`<b>Name: </b>${item.name_en}<br><b>Description: </b>${item.short_description_en}`).openPopup()
        })

        markers.addLayer(marker)
		$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.name_en}</div`)

		

    })

    markers.addTo(map);

    map.fitBounds(markers.getBounds());
}

function flyToIndex(index){
    map.flyTo([data.data[index].latitude,data.data[index].longitude],12)
    markers.getLayers()[index].openPopup()
}

/*
function panToImage(index){
	// zoom to level 17 first
	map.setZoom(17);
	// pan to the marker
	map.panTo(markers.getLayers()[index]._latlng);
}
*/
