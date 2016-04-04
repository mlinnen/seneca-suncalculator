

//var seneca = require('seneca')();
var sunCalc = require('suncalc');

module.exports = function suncalculator(options) {

    var seneca = this;
    var role = options.role

    this.add({ role: role, cmd: 'calc' }, function(msg, respond) {
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

    this.add({ role: role, cmd: 'eventcheck' }, function(msg, respond) {
        var answer = 'none';
        var forDateTime = new Date();
        if (msg.date) {
            // Use the date passed in the msg
            forDateTime = new Date(msg.date);
        }
        var data = sunCalc.getTimes(forDateTime, msg.lat, msg.long);
        var sunrise = new Date(data.sunrise);
        var sunset = new Date(data.sunset);
        var dawn = new Date(data.dawn);
        var dusk = new Date(data.dusk);
        var sunriseEnd = new Date(data.sunriseEnd);
        var sunsetStart = new Date(data.sunsetStart);
        var night = new Date(data.night);
        var nightEnd = new Date(data.nightEnd);
        var solarNoon = new Date(data.solarNoon);
        
        if (forDateTime.getHours() == sunrise.getHours() && forDateTime.getMinutes() == sunrise.getMinutes()) {
            answer = 'sunrise';
        }
        else if (forDateTime.getHours() == sunset.getHours() && forDateTime.getMinutes() == sunset.getMinutes()) {
            answer = 'sunset';
        }
        else if (forDateTime.getHours() == dawn.getHours() && forDateTime.getMinutes() == dawn.getMinutes()) {
            answer = 'dawn';
        }
        else if (forDateTime.getHours() == dusk.getHours() && forDateTime.getMinutes() == dusk.getMinutes()) {
            answer = 'dusk';
        }
        else if (forDateTime.getHours() == sunriseEnd.getHours() && forDateTime.getMinutes() == sunriseEnd.getMinutes()) {
            answer = 'sunriseEnd';
        }
        else if (forDateTime.getHours() == sunsetStart.getHours() && forDateTime.getMinutes() == sunsetStart.getMinutes()) {
            answer = 'sunsetStart';
        }
        else if (forDateTime.getHours() == night.getHours() && forDateTime.getMinutes() == night.getMinutes()) {
            answer = 'night';
        }
        else if (forDateTime.getHours() == nightEnd.getHours() && forDateTime.getMinutes() == nightEnd.getMinutes()) {
            answer = 'nightEnd';
        }
        else if (forDateTime.getHours() == solarNoon.getHours() && forDateTime.getMinutes() == solarNoon.getMinutes()) {
            answer = 'solarNoon';
        }
        respond(null, { answer: answer });
    })

    return {
        name: role
    }
}


