

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

    this.add({ role: role, cmd: 'calcdays' }, function(msg, respond) {
        var results = [];
        if (msg.date) {
            // Use the date passed in the msg
            var date = new Date(msg.date);
            for (i = 0; i < msg.numberOfDays; i++) {
                results[i] = { times: sunCalc.getTimes(date, msg.lat, msg.long), lat: msg.lat, long: msg.long, date: date };
                date = addDays(date,i);
            }
            respond(null, results);
        }
        else {
            // Use today's date
            var date = new Date();
            for (i = 0; i < msg.numberOfDays; i++) {
                results[i] = { times: sunCalc.getTimes(date, msg.lat, msg.long), lat: msg.lat, long: msg.long, date: date };
                date = addDays(date,1);
            }
            respond(null, results);
        }
    })

    this.add({ role: role, cmd: 'eventcheck' }, function(msg, respond) {
        var answer = 'none';
        var forDateTime = new Date();
        var offset = 0;
        if (msg.date) {
            // Use the date passed in the msg
            forDateTime = new Date(msg.date);
        }
        if (msg.offset) {
            offset = msg.offset;
        }
        var data = sunCalc.getTimes(forDateTime, msg.lat, msg.long);
        var sunrise = new Date(data.sunrise);
        sunrise.setMinutes(sunrise.getMinutes() + offset);
        var sunset = new Date(data.sunset);
        sunset.setMinutes(sunset.getMinutes() + offset);
        var dawn = new Date(data.dawn);
        dawn.setMinutes(dawn.getMinutes() + offset);
        var dusk = new Date(data.dusk);
        dusk.setMinutes(dusk.getMinutes() + offset);
        var sunriseEnd = new Date(data.sunriseEnd);
        sunriseEnd.setMinutes(sunriseEnd.getMinutes() + offset);
        var sunsetStart = new Date(data.sunsetStart);
        sunsetStart.setMinutes(sunsetStart.getMinutes() + offset);
        var night = new Date(data.night);
        night.setMinutes(night.getMinutes() + offset);
        var nightEnd = new Date(data.nightEnd);
        nightEnd.setMinutes(nightEnd.getMinutes() + offset);
        var solarNoon = new Date(data.solarNoon);
        solarNoon.setMinutes(solarNoon.getMinutes() + offset);

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
    

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    
    return {
        name: role
    }
}


