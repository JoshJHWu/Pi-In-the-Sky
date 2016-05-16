// $(document).ready(function(){

    function getState(results){
      for (i = 0; i < results[0].address_components.length; i++){
        if(results[0].address_components[i].types[0].includes("administrative_area_level_1")){
          return results[0].address_components[i].short_name
        }
      }
    }

    function getCity(results){
      for (i = 0; i < results[0].address_components.length; i++){
        if(results[0].address_components[i].types[0].includes("locality")){
          return results[0].address_components[i].short_name
        }
      }
    }

 function initMap() {
        var mapDiv = document.getElementById('map');
        var map = new google.maps.Map(mapDiv, {
          center: {lat: 40.7118739, lng: -74.002533},
          zoom: 10
        });
        var geocoder  = new google.maps.Geocoder();             //

        google.maps.event.addListener(map, 'click', function(event) {
          //store LAT/LON upon click of google
          var x = "ok"
          var lat = (event.latLng.lat())
          var lng = (event.latLng.lng())
          latlength = Math.floor(lat * 10000000) / 10000000
          lnglength = Math.floor(lng * 10000000) / 10000000

          $.get("https://api.breezometer.com/baqi/?lat="+latlength+"&lon="+lnglength+"&key=c0bfb33a27924f7e95a828abc931d5a0").then(function(response){
            // reverse geolocate address based on coordinates

            var location  = {lat: latlength, lng: lnglength}

            // turn coordinates into an object
            geocoder.geocode({'latLng': location}, function (results, status) {
              if(status == google.maps.GeocoderStatus.OK && response.data_valid == true) {
            // if geocode success
                // city = results[0].address_components[3].short_name
                city = getCity(results);
                state = getState(results);
            // if address found, pass to processing function
            // document.write(add);

              }


            // display AQI data on page

            if(response.data_valid == true){
              // debugger;
              document.getElementById("city").innerHTML = [city, state]

              document.getElementById("AQI").innerHTML = [response.breezometer_aqi];

              document.getElementById("AQIdesc").innerHTML = [response.breezometer_description];

              document.getElementById("pollutant").innerHTML = response.dominant_pollutant_description
               ;

              document.getElementById("dominant-pollutant-text").innerHTML = response.dominant_pollutant_text["effects"]
               ;

            } else {
              document.getElementById("output").innerHTML =
              "Air quality cannot be read. You may be on the brink of death."
            }
            // POST response to server to create AQI object
            $.ajax({
                  url: '/global_data_objects',
                  dataType: 'json',
                  method: 'post',
                  data: {response, city, state, "authenticity_token": AUTH_TOKEN}
                  // remeber to pass in specific address
                })
              })
            });
        // closing geocoder here to retain access to 'city' variable
            })
          }

// })

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require_tree .

$(function(){ $(document).foundation(); });

