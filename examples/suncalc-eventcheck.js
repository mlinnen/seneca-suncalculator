var seneca = require('seneca')();

seneca.use('../suncalculator');

// Uses today's date for the eventcheck
seneca.act({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124}, console.log);

// Uses a passed in date for the eventcheck and this should fire a sunrise action
seneca.act({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2017 07:23:40 GMT-0400 (Eastern Daylight Time)')}, console.log)

// Uses a passed in date for the eventcheck and this should fire a sunset action
seneca.act({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2017 19:38:32 GMT-0400 (Eastern Daylight Time)')}, console.log)
