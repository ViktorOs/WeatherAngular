angular.module('weatherApp', [])
.controller('WeatherController', function ($scope, $http, $window) {

	$scope.cityArray = [];
	$scope.cityResponseArray = [];

	$scope.addToLocalStorage = function(city) {
    	$window.localStorage.setItem('cityList', JSON.stringify(city));
    } 

    $scope.getFromLocalStorage = function() {
    	return $window.localStorage.getItem('cityList');
    }  

    $scope.updateLocalStorage = function(city) {
    	$window.localStorage.setItem('cityList', JSON.stringify(city));
    }

    $scope.removeCity = function (num) {
        $scope.cityResponseArray.splice(num, 1);
        $scope.cityArray.splice(num, 1);
        $scope.updateLocalStorage($scope.cityArray);
    }

    $scope.getCityWeather = function(url) {
        if (url) {
            url = url;
            newCity = false;
        }else{
        	if($scope.cityArray.indexOf($scope.cityName) >= 0 || $scope.cityName == undefined) {
				return false;
			}
			newCity = true;
            var url = "http://api.openweathermap.org/data/2.5/weather?q=" + $scope.cityName + "&APPID=a73e673d671afa8ac0a1a20cbeca3ed2";
        }   
       
        $http.get(url).success(function(data, status) {
        	$scope.cityResponseArray.push(data);  

            $scope.currentCity = data.name || $scope.cityName;

            if(newCity){
	            $scope.cityArray.push($scope.currentCity);
	        }

            $scope.addToLocalStorage($scope.cityArray);
        })
    }  

	if($scope.getFromLocalStorage()){
		$scope.cityArray =  JSON.parse($scope.getFromLocalStorage());

		angular.forEach($scope.cityArray, function(value, key) {
			var url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + "&APPID=a73e673d671afa8ac0a1a20cbeca3ed2";
			
			$scope.getCityWeather(url);
		});
	}

    if ($window.navigator.geolocation) {
        $window.navigator.geolocation.getCurrentPosition(function(position){
            
            $scope.$apply(function(){
                $scope.coords = {
                    lat:position.coords.latitude, 
                    lon:position.coords.longitude
                }; 
                var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + $scope.coords.lat + "&lon=" + $scope.coords.lon + "&APPID=a73e673d671afa8ac0a1a20cbeca3ed2"; 
                $scope.getCityWeather(url)
            })
            
        },function(error){
            console.log(error.message)
        });
    }    

    

})