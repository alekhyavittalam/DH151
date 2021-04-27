// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;
//let path = "http://0.0.0.0:8000/";
let path = "whc-sites-2019.csv"
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


function mapCSV(data){

    //loop through each entry
    data.data.forEach(function(item,index){
        let marker = L.marker([item.latitude,item.longitude])

        markers.addLayer(marker)

    })

    markers.addTo(map);

    map.fitBounds(markers.getBounds());
}

/*
function panToImage(index){
	// zoom to level 17 first
	map.setZoom(17);
	// pan to the marker
	map.panTo(markers.getLayers()[index]._latlng);
}
*/
