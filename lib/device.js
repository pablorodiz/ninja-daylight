var stream = require('stream')
  , util = require('util')
  , exec = require('child_process').exec
  , SunCalc = require('suncalc'),
  child;
require('date-utils');

// Give our device a stream interface
util.inherits(Device,stream);

// Export it
module.exports=Device;

/**
 * Creates a new Device Object
 *
 * @property {Boolean} readable Whether the device emits data
 * @property {Boolean} writable Whether the data can be actuated
 *
 * @property {Number} G - the channel of this device
 * @property {Number} V - the vendor ID of this device
 * @property {Number} D - the device ID of this device
 *
 * @property {Function} write Called when data is received from the Ninja Platform
 *
 * @fires data - Emit this when you wish to send data to the Ninja Platform
 */
function Device(opts) {
 
  var self = this;
 
  // This device will emit data
  this.readable = true;
  // This device can be actuated
  this.writeable = false;
 
  this.G = "0"; // G is a string a represents the channel
  this.V = 0; // 0 is Ninja Blocks' device list
  this.D = 1; // 2000 is a generic Ninja Blocks sandbox device
  this.name = "Daylight counter"

  process.nextTick(function() {
    setInterval(function() {
      //Get location from configuration options
      var longitude = parseFloat(opts.longitude);
      var latitude = parseFloat(opts.latitude);
      //Get today and tomorrow dates
      var now = new Date(); 
      var tomorrow = new Date.tomorrow();
      //Get sunrise and sunset times from SunCalc 
      var times = SunCalc.getTimes(now, latitude, longitude); 
      var times_tomorrow = SunCalc.getTimes(tomorrow, latitude, longitude);
  
      //Update sunset and sunrise times with Daylight Savings offset
      var sunrise_today = times.sunriseEnd;
      var sunrise_tomorrow = times_tomorrow.sunriseEnd;
      var sunset_today = times.sunsetStart;

      sunrise_today.addMinutes(-now.getTimezoneOffset());
      sunrise_tomorrow.addMinutes(-tomorrow.getTimezoneOffset());
      sunset_today.addMinutes(-now.getTimezoneOffset());
      //Define counter value
      //Day: value =  minutes to sunset
      if(Date.compare(now , sunrise_today)>0 && Date.compare(now, sunset_today)<0){
          var counter = sunset_today.getHours() *60 + sunset_today.getMinutes() -
            now.getHours()*60 - now.getMinutes();        
      } 
      //Night: value = - minutes to sunrise
      else {
          if (Date.compare(now, sunset_today)>=0) {
              var counter = - sunrise_tomorrow.getHours() *60 - sunrise_tomorrow.getMinutes() +
              now.getHours()*60 + now.getMinutes() - 24*60;
          }
	  if (Date.compare(now, sunrise_today)<=0) {
              var counter = - sunrise_today.getHours() *60 - sunrise_today.getMinutes() +
              now.getHours()*60 + now.getMinutes();
          }
      }
      if (counter >= 1440) counter = counter - 1440;
      //console.log("Sunrise is at " + sunrise_today);
      //console.log("Sunset is at " + sunset_today);
      //console.log("Counter = " + counter);
      self.emit('data',counter);
 
    }, 600000);
  });
};
Device.prototype.write = function(data) {
 
};
