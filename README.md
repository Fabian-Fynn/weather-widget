# Weather Widget
Easy-to-use weather widget with geolocation.

##Motivation
Never again search for a weather widget that fits the current project.
It's easy to integrate, modify and style.

##Included Features
* Current weather
* Get location via geolocation or city name
* Hide unwanted information and buttons:
   * Weather condition description
   * Min and max temperature
   * Geolocation button
   * "Edit city name"-button

* Multiple units
   * Metric - with Kelvin for temperatures
   * Metric - with ˚C for temperatures
   * Imperial
* Multilingual support
* Condition icons - in SVG format

##Planned Features
  * Multiple color schemes
  * Adjustable widget sizes
  * Forecasts
  * Condition icons - in PNG format

###Usage
Just add the follow components to your HTML file:

The element in which the widget will be placed:

    <body>
      <div id="weather-widget"></div>
    </body>

Include jQuery in HEAD section or before the weather.js file:

    <script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
    <script src="../widget/weather.js"></script>

After that you have to include call the weather function with your desired options:

    <script>
      weather({
        element: "weather-widget",
        units: "metric",
        language: "de",
        tempRange: false,
        conditionName: false,
        geolocationButton: false,
        editCityButton: false
      });
    </script>

Checkout the demo for a complete example.

###Options
All options are nonobligatory.

| Option            | Effect                                        | Values                                        | Default                       |
|-------------------|-----------------------------------------------|-----------------------------------------------|-------------------------------|
| element           | Defines the DOM element to put the widget in  | Any DOM ID                                    | weather-widget                |
| units             | Defines which unit system to use              | metric, imperial                              | standard (metric with Kelvin) |
| language          | Defines the language of the weather condition | check http://openweathermap.org/current#multi | en (English)                  |
| tempRange         | Shows the min and max temperature values      | true, false                                   | true                          |
| conditionName     | Shows the weather condition description       | true, false                                   | true                          |
| geolocationButton | Shows the geolocation button                  | true, false                                   | true                          |
| editCityButton    | Shows the button to edit the city name        | true, false                                   | true                          |


##Contribute
I'm happy to welcome anyone on board. If you have suggestions or complaints, fire away! Just add an issue.

For pull requests please follow these rules:
 1. Fork this project
 2. Make a new feature branch
 3. Hack away
 4. When adding features, add them to this README
 5. Push branch to GitHub
 6. Make pull request

##License
Copyright (c) 2016 Fabian Hoffmann

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
