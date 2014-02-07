exports.menu = {
  "contents":[
    { "type": "paragraph", "text": "Welcome to the Ninja Daylight counter"},
    { "type": "paragraph", "text": "Daylight counter calculates sun rise and set time for your position, so you can use this information in your rules.\n\rThe driver behaves like a temperature sensor, giving a new value every ten minutes. The values offered reprent the time remaining (in minutes) for the next sun event. Minutes to sunset during the day and minutes remaining to sunrise (negative) during night. You can choose negative values for events at night or positive for events at day time.\n\rMAKE SURE YOUR NINJABLOCK HAS THE RIGHT TIME ZONE CONFIGURATION!!!\n\rFor precise time calculations please provide location information in decimal notation."},
    { "type": "input_field_text", "field_name": "latitude", "value": "", "label": "Latitude", "required": true},
    { "type": "input_field_text", "field_name": "longitude", "value": "", "label": "Longitude", "required": true},
    { "type": "submit", "name": "Save", "rpc_method": "echo" },
  ]
};

exports.echo = {
  "contents":[
    { "type": "paragraph", "text": "Settings Saved!"}
  ]
};

