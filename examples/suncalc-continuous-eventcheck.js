var seneca = require('seneca')();

seneca.use('../suncalculator');

// Capture the sunrise event
seneca.add({role: 'suncalculator', event: 'sunrise'}, function (msg, respond) {
  console.log('got sunrise event');
  respond(null, {answer: 'ok'})
});

// Capture the sunset event
seneca.add({role: 'suncalculator', event: 'sunset'}, function (msg, respond) {
  console.log('got sunset event');
  respond(null, {answer: 'ok'})
});

setInterval(function(options) {
    // Uses today's date for the eventcheck
    seneca.act({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124}, console.log);
}, 500);



