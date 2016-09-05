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
      tempSymbol = "˚C";
      break;
    case "imperial":
      tempSymbol = "˚F";
      break;
    default:
      tempSymbol = "K";
  }

  //create HTML elements
  var $element = $("#" + options.element);
  $element.addClass("weather-widget");
  $element.html("<div class=left>\
                  <div class=icon></div>\
                </div><div class=right>\
                  <div class=temp>\
                    <div class=current-temp>" + tempSymbol + "</div>\
                  </div>\
                  <div class=city><input type=text id='city-name' value='" + city + "'></div>\
                  <div class=location-btns>\
                  </div></div>\
                <link href='https://fonts.googleapis.com/css?family=Work+Sans' rel='stylesheet'>\
                <link rel='stylesheet' type='text/css' href='../widget/weather.css'>"
               );

  if (options.geolocationButton !== false) {
    $element.find(".location-btns").append("<div class=geolocation>&#8982;</div>");
  }

  if (options.editCityButton !== false) {
    $element.find(".location-btns").append("<div class=edit-city-name> &#9998;</div>");
  }


  $element.find(".geolocation").click(function(el) {
    geolocate();
  });

  $element.find(".edit-city-name").click(function(el) {
    $element.find(".city input").focus();
    $element.find(".city input").val('');

    editCity();
  });

  $element.find(".city input").click(function(el) {
    editCity();
  });

  $element.find(".city input").keyup(function(event){
    if(event.keyCode == 13){
      setCity();
      $(this).blur();
    }
  });

  $element.find(".city input").blur(function(event){
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
    $element.find(".icon").html('<img src="http://openweathermap.org/img/w/' + icon + '.png">');

    if (options.conditionName !== false) {
      $element.find(".icon").append("<span>" + res.weather[0].description + "</span>");
    }
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
    city = city.replace(/ /g,"+");
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
    var $city = $element.find(".city");
    var city = $city.find('input').val();
    var oldCity = localStorage.getItem("city");

    if (city === "") {
      if (oldCity === null) {
        city = "N/A";
      } else {
        city = oldCity;
      }

      $city.find('input').val(city);
    } else {
      localStorage.setItem("city", city);
      getWeatherByCityName(city);
    }
    $city.removeClass("editable");
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
