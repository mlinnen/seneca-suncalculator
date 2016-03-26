var seneca = require('seneca')();

seneca.use('../suncalculator');

// Uses today's date for the calcuation
seneca.act({role: 'suncalculator', cmd: 'calc', lat: 35.227085, long: -80.843124}, console.log);

// Uses a passed in date for the calcuation
seneca.act({role: 'suncalculator', cmd: 'calc', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2017 22:40:23 GMT-0400 (Eastern Daylight Time)')}, console.log)
