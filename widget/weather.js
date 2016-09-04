function weather(options) {
  var locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

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

  var $element = $("#" + options.element);
  $element.html("<div class=city>N/A</div>\
  <div class=icon></div>\
  <div class=temp>\
  <div class=current-temp>" + tempSymbol + "</div>\
  </div>");

  if (options.tempRange !== false) {
    $element.find(".temp").append("<div class=temp-range>" + tempSymbol + " | " + tempSymbol + "</div>");
  }

  function displayWeather(res) {
    var icon = res.weather[0].icon;

    $element.find(".city").html(res.name);
    $element.find(".current-temp").html(Math.floor(res.main.temp) + tempSymbol);
    $element.find(".temp-range").html(Math.floor(res.main.temp_min) + tempSymbol + " | " + Math.floor(res.main.temp_max) + tempSymbol);
    $element.find(".icon").html('<img src="http://openweathermap.org/img/w/' + icon + '.png"><p>' + res.weather[0].description + '</p>');
  }

  function getWeather(pos) {
    var long = pos.coords.longitude;
    var lat = pos.coords.latitude;

    sendApiRequest('http://api.fabianhoffmann.io/weather/geolocation?longitude=' + long + '&latitude=' + lat + '&units=' + options.units + '&lang=' + options.language).then(function(response) {
      displayWeather(JSON.parse(response));
    }, function(error) {
      //displayError(error);
    });
  }

  function locationSuccess(pos) {
    getWeather(pos);
  };

  function locationError(err) {
    console.log(err);
  };

  navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
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
