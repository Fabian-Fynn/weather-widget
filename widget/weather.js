function weather(options) {
  var locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  var city = localStorage.getItem("city");

  if (typeof city !== "string") {
    city = "N/A";
  }

  var tempSymbol;

  switch (options.units) {
    case "metric":
      tempSymbol = "&#x2103;";
      break;
    case "imperial":
      tempSymbol = "&#x2109;";
      break;
    default:
      tempSymbol = "K";
  }

  //create HTML elements
  var $element = $("#" + options.element);
  $element.html("<div class=city><input type=text value='" + city + "'><button>Set</button></div>\
  <div class=icon></div>\
  <div class=temp>\
  <div class=current-temp>" + tempSymbol + "</div>\
  <div class=location-btns>\
  <div class=geolocation>GEO</div><div class=edit-city-name>Enter City Name</div>\
  </div>");

  $element.find(".geolocation").click(function(el) {
    geolocate();
  });

  $element.find(".edit-city-name").click(function(el) {
    editCity();
  });

  $element.find(".city button").click(function(el) {
    setCity();
  });

  if (options.tempRange !== false) {
    $element.find(".temp").append("<div class=temp-range>" + tempSymbol + " | " + tempSymbol + "</div>");
  }

  if (city !== "N/A") {
    getWeatherByCityName(city);
  }

  function displayWeather(res) {
    var icon = res.weather[0].icon;

    $element.find(".city input").val(res.name);
    $element.find(".current-temp").html(Math.floor(res.main.temp) + tempSymbol);
    $element.find(".temp-range").html(Math.floor(res.main.temp_min) + tempSymbol + " | " + Math.floor(res.main.temp_max) + tempSymbol);
    $element.find(".icon").html('<img src="http://openweathermap.org/img/w/' + icon + '.png"><p>' + res.weather[0].description + '</p>');
  }

  function getWeatherByGeolocation(pos) {
    var long = pos.coords.longitude;
    var lat = pos.coords.latitude;

    sendApiRequest('http://api.fabianhoffmann.io/weather/geolocation?longitude=' + long + '&latitude=' + lat + '&units=' + options.units + '&lang=' + options.language).then(function(response) {
      var res = JSON.parse(response);
      localStorage.setItem("city", res.name);
      displayWeather(res);
    }, function(error) {
      //displayError(error);
    });
  }

  function getWeatherByCityName(city) {
    sendApiRequest('http://api.fabianhoffmann.io/weather/city/' + city + '?units=' + options.units + '&lang=' + options.language).then(function(response) {
      var res = JSON.parse(response);
      displayWeather(res);
    }, function(error) {
      //displayError(error);
    });
  }

  function geolocate(){
    navigator.geolocation.getCurrentPosition(getWeatherByGeolocation, locationError, locationOptions);
  };

  function editCity() {
    var $city = $element.find(".city");
    $city.addClass("editable");
  };

  function setCity() {
    var city = $element.find(".city input").val();
    localStorage.setItem("city", city);
    getWeatherByCityName(city);
  }

  function locationError(err) {
    console.log(err);
  };
};

function sendApiRequest(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    if ("withCredentials" in req) {
      req.open('GET', url);
    }

    req.onload = function() {
      if (req.status === 200) {
        resolve(req.response);
      }
      else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = function(err) {
      console.log(err)
      reject(Error("Network Error"));
    };

    req.send();
  });
}
