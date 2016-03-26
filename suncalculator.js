

//var seneca = require('seneca')();
var sunCalc = require('suncalc');

module.exports = function suncalculator(options) {
    
    var seneca = this;
    
    this.add({ role: 'suncalculator', cmd: 'calc' }, function(msg, respond) {
        if (msg.date) {
            // Use the date passed in the msg
            respond(null, { times: sunCalc.getTimes(new Date(msg.date), msg.lat, msg.long), lat: msg.lat, long: msg.long, date: msg.date });
        }
        else {
            // Use today's date
            var today = new Date();
            respond(null, { times: sunCalc.getTimes(new Date(), msg.lat, msg.long), lat: msg.lat, long: msg.long, date: today });
        }
    })

    this.add({ role: 'suncalculator', cmd: 'eventcheck' }, function(msg, respond) {
        var answer = 'none';
        var forDateTime = new Date();
        if (msg.date) {
            // Use the date passed in the msg
            forDateTime = new Date(msg.date);
        }
        var data = sunCalc.getTimes(forDateTime, msg.lat, msg.long);
        var sunrise = new Date(data.sunrise);
        var sunset = new Date(data.sunset);
        if (forDateTime.getHours() == sunrise.getHours() && forDateTime.getMinutes() == sunrise.getMinutes()) {
            answer = 'sunrise';
        }
        else if (forDateTime.getHours() == sunset.getHours() && forDateTime.getMinutes() == sunset.getMinutes()) {
            answer = 'sunset';
        }
        respond(null, { answer: answer });
    })
}


