# seneca-suncalculator

## A plugin for [Seneca](http://senecajs.org) 
This plugin will expose actions to calculate the position of the sun or moon. 

## Install
Since Seneca and this service are built on top of [Node.js](https://nodejs.org) you will need to have it installed.
Clone this repository into a directory of your choice and run the following command:
```
npm install
```

## Examples
Make sure you have already done the install steps to get the source and the dependencies installed on your system. 

1. Open up a command or shell prompt and navigate to the directory where you installed the source
2. Run the following to invoke the calc action

 ```
 node examples\suncalc-calc.js
 ```

3. Run the following to invoke the eventcheck action

 ```
 node examples\suncalc-eventcheck.js
 ```
 
## Actions

### ACTION: role:suncalculator, cmd:calc
Calculates the sun and moon details for a specified date, lat, long.
- _lat_: the latitude for the calculation
- _long_: the longitude for the calculation
- _date_: the date for the calculation. If this is omitted then the current date is used.

### ACTION: role:suncalculator, cmd:eventcheck
Calculates the sun and moon details for a specified date, time, lat and long.  Uses this date to emit an action if a sunrise or sunset is occuring.
- _lat_: the latitude for the calculation
- _long_: the longitude for the calculation
- _date_: the date for the calculation. If this is omitted then the current date is used.


## Roadmap
These are a few items I think this module could use to make it more useful.  I don't have any plans on
when the following will be done or in what order.
- Convert this into a plugin
- Allow for the _lat_ and _long_ be set as an options
- Add tests
- Add support for more suncalc actions
- Add more examples
- Add a build process
- Make this an NPM package