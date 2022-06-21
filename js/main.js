function getAPIdata() {

var url = 'https://api.openweathermap.org/data/2.5/weather';
var apiKey ='89496f7057c64efdc8b56b67d21c79c0';
var city = document.getElementById('city').value;

var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
fetch(request)
	
.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		 return response.json();
	})
	
.then(function(response) {
		console.log(response);
		 onAPISucces(response);	
	})
	
.catch(function (error) {
		onAPIError(error);
	});
}


function onAPISucces(response) {

var degC = Math.floor(response.main.temp - 273.15);
var speed = response.wind.speed;
var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'Temperature: ' + degC + ' &#176;C <br>' + 'Wind speed: ' + speed +' m/s' +'<br>'+response.name;

}


function onAPIError(error) {
	console.error('Fetch request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'Sorry, Failed to obtain the weather <br/> Change locatin please!'; 
}

document.getElementById('getWeather').onclick = function(){
	getAPIdata();
};

mapboxgl.accessToken = 'pk.eyJ1Ijoic29uZzk4MTMiLCJhIjoiY2w0bXMxc2U0MTF0cTNsbzE0OG5tcjg5YyJ9.9zTP1dXR3O0lG6q4BxVHIQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/song9813/cl4ms4lvt004k14mtpbp1r37h',
  center: [4.281120, 52.093330],
  zoom: 13.15
});

map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  }),
  'top-left'
);

var marker = new mapboxgl.Marker({
  color: 'blue'
});

function addMarker(event) {
 
var coordinates = event.lngLat;
 console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
 marker.setLngLat(coordinates).addTo(map);
};

map.on('click', addMarker);