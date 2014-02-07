ninja-daylight
==============

Ninjablocks driver that offers time to sunrise and time to sunset counters for your location and time

The driver calculates sun rise and set time from your position, so you can use precise day or night time information in your rules. The driver behaves like a temperature sensor, giving a new value every ten minutes. The values offered reprent the time remaining (in minutes) for the next sun event. Minutes to sunset during the day and minutes remaining to sunrise (negative) during night. You can choose negative values for events at night or positive for events at day time. For precise time calculations please provide location information in decimal notation.

Installation
============

Cd into your drivers directory (/opt/ninja/drivers on the block or client/drivers/ on Mac
OS X) and type: git clone git://github.com/pablorodiz/ninja-daylight.git
After the clone finishes, cd into the ninja-daylight directory and type: sudo 
npm install to satisfy the dependencies for this driver and then restart your block with: 
sudo restart
You should then see a new text input Widget appear on your Dashboard and a new "temperature like" sensor 
for your rules will be also available. 

Dependencies
============

Ninjablocks daylight driver extensively depends on SunCalc utilities for node.js 
https://github.com/mourner/suncalc

