angular.module('weatherApp', [])
.controller('WeatherController', function ($scope, $http) {
    if (navigator.geolocation) {
        geolocation.getCurrentPosition().then(function(data){
          $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
        });
    }
    
    console.log(navigator.geolocation)
    console.log($scope.coords)

    $scope.sendPost = function() {

        /*var url = "http://api.openweathermap.org/data/2.5/forecast/city?id=703448&APPID=a73e673d671afa8ac0a1a20cbeca3ed2"*/
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + $scope.cityName + "&APPID=a73e673d671afa8ac0a1a20cbeca3ed2";
       
        $http.get(url).success(function(data, status) {

            $scope.wind_speed = data.wind.speed;   
            $scope.cloudiness = data.weather[0].description;
            $scope.icon = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
            $scope.temperature = data.main.temp - 273.15;
            $scope.pressure = data.main.pressure;
            $scope.humidity = data.main.humidity;
            $scope.country = data.sys.country;
            $scope.sunrise = data.sys.sunrise;
            $scope.sunset = data.sys.sunset;   
            $scope.geo_coords_lat = data.coord.lat;
            $scope.geo_coords_lon = data.coord.lon;
            $scope.currentCity = $scope.cityName;
        })

    }                   
})