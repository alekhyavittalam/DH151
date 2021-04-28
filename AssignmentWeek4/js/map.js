// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;
let path = "data/whc-sites-2019.csv"
let markers = L.featureGroup();
//let Culturalmarkers = L.featureGroup();
//let Naturalmarkers = L.featureGroup();
//let Mixedmarkers = L.featureGroup();

// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
    readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);
​
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
​
		}
	});
}
​
function mapCSV(data){
​
    let circleOptions = {
        radius: 5,
        weight: 1,
        color: 'white',
        fillColor: 'dodgerblue',
        fillOpacity: 1
    }
    //loop through each entry
    data.data.forEach(function(item,index){
		// yk: I had to change the way the marker is created by adding the popup to the marker first,
		// and then adding the mouseover effect
		let marker = L.circleMarker([item.latitude,item.longitude], circleOptions)
		.bindPopup(`<b>Name: </b>${item.name_en}<br><b>Description: </b>${item.short_description_en}`)
		.on('mouseover',function(){
            this.openPopup()
        })
​
		//Sidebar is not clicking to show the marker
        markers.addLayer(marker)
		
		$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.name_en}</div`)
​
		

    })
​
	markers.addTo(map);
​
    map.fitBounds(markers.getBounds());
}
​
	function flyToIndex(index){
		// yk: the call to pan to the map to a given location is different from the loop
		map.setZoom(12);
		map.panTo(markers.getLayers()[index].getLatLng());
		markers.getLayers()[index].openPopup()
	}
​
	
/*	Tried adding different layers but wasn't working
​
//Layer Groups
var Cultural = new L.LayerGroup();
var Natural = new L.LayerGroup();
var Mixed = new L.LayerGroup();
​
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
​
let layers = {
	"Cultural": Cultural,
	"Natural": Natural,
	"Mixed": Mixed
}
​
// add layer control box
L.control.layers(null,layers).addTo(map)
​
​
​
	
​
	function mapCSV(data){
​
		let circleOptions = {
			radius: 5,
			weight: 1,
			color: 'white',
			fillColor: 'dodgerblue',
			fillOpacity: 1
		}
		//loop through each entry
		data.data.forEach(function(item,index){
			if(item.category == "Cultural"){
				let Culturalmarker = L.circleMarker([item.latitude,item.longitude], circleOptions).on('mouseover',function(){
					this.bindPopup(`<b>Name: </b>${item.name_en}<br><b>Description: </b>${item.short_description_en}`).openPopup()
				})
				Culturalmarkers.addLayer(Culturalmarker)
​
			}
​
			if(item.category == "Natural"){
				letNaturalmarker = L.circleMarker([item.latitude,item.longitude], circleOptions).on('mouseover',function(){
					this.bindPopup(`<b>Name: </b>${item.name_en}<br><b>Description: </b>${item.short_description_en}`).openPopup()
				})
				Naturalmarkers.addLayer(Naturalmarker)
			}
​
			else{
				letMixedmarker = L.circleMarker([item.latitude,item.longitude], circleOptions).on('mouseover',function(){
					this.bindPopup(`<b>Name: </b>${item.name_en}<br><b>Description: </b>${item.short_description_en}`).openPopup()
				})
				Mixedmarkers.addLayer(Mixedmarker)
			}
			
			
			$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.name_en}</div`)
	
			//add featuregroup to map
			Culturalmarkers.addTo(map)
			Naturalmarkers.addTo(map)
			Mixedmarkers.addTo(map)
	
		})
​
		let addedLayers = {
			"Cultural": Culturalmarkers,
			"Natural": Naturalmarkers,
			"Mixed": Mixedmarkers,
		}
​
		L.control.layers(null,addedLayers).addTo(map);
​
    //markers.addTo(map);
​
    map.fitBounds(Culturalmarkers.getBounds());
}
*/