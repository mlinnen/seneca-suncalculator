# seneca-suncalculator

## A plugin for [Seneca](http://senecajs.org) 
This plugin will expose actions to calculate the position of the sun or moon.

[![npm version](https://badge.fury.io/js/seneca-suncalculator.svg)](https://www.npmjs.com/package/seneca-suncalculator)
[![Build Status](https://travis-ci.org/mlinnen/seneca-suncalculator.svg)](https://travis-ci.org/mlinnen/seneca-suncalculator)

## Install
Since Seneca and this service are built on top of [Node.js](https://nodejs.org) you will need to have it installed.
To install run the following commands:
```
npm install seneca
npm install seneca-suncalculator
```

## Quick Example
Make sure you have already done the install steps to get the seneca and seneca-suncalculator modules in your working folder. 

```
var seneca = require('seneca')();

seneca.use('suncalculator');

// Uses today's date for the calcuation
seneca.act({role: 'suncalculator', cmd: 'calc', lat: 35.227085, long: -80.843124}, console.log);

// Uses a passed in date for the calcuation
seneca.act({role: 'suncalculator', cmd: 'calc', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2017 22:40:23 GMT-0400 (Eastern Daylight Time)')}, console.log)
```
 
## Actions

### ACTION: role:suncalculator, cmd:calc
Calculates the sun and moon details for a specified date, lat, long.
- _lat_: the latitude for the calculation
- _long_: the longitude for the calculation
- _date_: the date for the calculation. If this is omitted then the current date is used.

Returns an answer object with times as a result of the calculation. 

### ACTION: role:suncalculator, cmd:eventcheck
Calculates the sun and moon details for a specified date, time, lat and long.  Uses this date & time to return a value that indicates if a specific event is currently occuring.
- _lat_: the latitude for the calculation
- _long_: the longitude for the calculation
- _date_: the date for the calculation. If this is omitted then the current date is used.

Returns an answer of the following: none, sunrise, sunset, dawn, dusk, night, sunriseEnd, sunsetStart, nightEnd, or solarNoon.

## Roadmap
These are a few items I think this module could use to make it more useful.  I don't have any plans on
when the following will be done or in what order.
- Allow for the _lat_ and _long_ be set as an options
- Add support for more suncalc actions

