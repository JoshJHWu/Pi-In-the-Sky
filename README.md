#Pi in the Sky
Pi in the sky aims to raise your awareness for health and air quality.
There are two components; a web interface written in Ruby on Rails for data received from ``local-sensor-app.rb``.


##How to use
Begin at http://pi-in-the-sky.herokuapp.com/

![login](http://i.imgur.com/IMme2GDg.png?1)

Register or log in

![profile](http://i.imgur.com/OaLYO6c.png?1)
After registering or logging in, you will be redirected to your profile. Here you can access your favorite cities. You can also change your phone number and alert level. Pi in the Sky will send you and SMS message when one of your favorite city's AQI dips below your specified alert level.

![CO2](http://i.imgur.com/4oKtAqu.png?1)
The map page has two sections
The top half indicates CO2 in ppm. Data is updated in real time by a MQ-135 air quality sensor

![map](http://i.imgur.com/4oKtAqu.png?1)
The second half uses the  Google Maps API. You can search by city and find the AQI and additional information associated with that city.

##MQ-135 Sensor
![sensor](http://i.imgur.com/nLcVojN.jpg?1)
Initially Pi in the Sky was intended to use the Raspberry Pi. The decision was made to use an Arduino when we found the Raspberry Pi was not easily compatible with the sensor's analog output. There is a standalone app written in Ruby which the Arduino communicates with using Ruby-SerialPort which then sends a post request per second using the HTTParty gem. Pi in the Sky listens for this and will update the CO2 content through AJAX.


###Contributors
[Josh Wu](https://github.com/JoshJHWu),[Jill Campbell](https://github.com/jillwc07),[Alex Forger](https://github.com/darrow87),[Carl Conroy](https://github.com/carlincharge)
