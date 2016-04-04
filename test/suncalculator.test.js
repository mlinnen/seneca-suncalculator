'use strict'

var Seneca = require('seneca')

var _ = require('lodash')

var Lab = require('lab')
var Code = require('code')
var lab = exports.lab = Lab.script()
var suite = lab.suite
var test = lab.test
var before = lab.before
var expect = Code.expect

var si = Seneca()
si.use('../suncalculator')

suite('seneca-suncalculator calc suite tests ', function () {
  before({}, function (done) {
    si.ready(function (err) {
      if (err) {
        return process.exit(!console.error(err))
      }

      done()
    })
  })

  test('suncalculator/calc no date test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'calc', lat: 35.227085, long: -80.843124,}), function (err, data) {
      expect(err).to.not.exist();
      expect(data).to.exist();
      done(err);
    });
  });

  test('suncalculator/calc with date test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'calc', lat: 35.227085, long: -80.843124, date: Date.UTC(2016,2,23,11,20,0,0)}), function (err, data) {

      expect(err).to.not.exist();
      expect(data).to.exist();
      expect(data.times).to.exist();
      
      // Sunrise
      var actualDate = new Date(data.times.sunrise);
      var expectedDate = new Date(Date.UTC(2016,2,23,11,23,18,0));
      expect(String(actualDate)).to.equal(String(expectedDate));
      
      // Sunset
      actualDate = new Date(data.times.sunset);
      expectedDate = new Date(Date.UTC(2016,2,23,23,38,44,0));
      expect(String(actualDate)).to.equal(String(expectedDate));
      
      // SolarNoon
      actualDate = new Date(data.times.solarNoon);
      expectedDate = new Date(Date.UTC(2016,2,23,17,31,1,0));
      expect(String(actualDate)).to.equal(String(expectedDate));

      // nadir
      actualDate = new Date(data.times.nadir);
      expectedDate = new Date(Date.UTC(2016,2,23,5,31,1,0));
      expect(String(actualDate)).to.equal(String(expectedDate));

      // sunriseEnd
      actualDate = new Date(data.times.sunriseEnd);
      expectedDate = new Date(Date.UTC(2016,2,23,11,25,54,0));
      expect(String(actualDate)).to.equal(String(expectedDate));

      // sunsetStart
      actualDate = new Date(data.times.sunsetStart);
      expectedDate = new Date(Date.UTC(2016,2,23,23,36,7,0));
      expect(String(actualDate)).to.equal(String(expectedDate));

      // dawn
      actualDate = new Date(data.times.dawn);
      expectedDate = new Date(Date.UTC(2016,2,23,10,57,56,0));
      expect(String(actualDate)).to.equal(String(expectedDate));

      // dusk
      actualDate = new Date(data.times.dusk);
      expectedDate = new Date(Date.UTC(2016,2,24,0,4,6,0));
      expect(String(actualDate)).to.equal(String(expectedDate));

      // nauticalDawn
      actualDate = new Date(data.times.nauticalDawn);
      expectedDate = new Date(Date.UTC(2016,2,23,10,28,15,0));
      expect(String(actualDate)).to.equal(String(expectedDate));

      // nauticalDusk
      actualDate = new Date(data.times.nauticalDusk);
      expectedDate = new Date(Date.UTC(2016,2,24,0,33,47,0));
      expect(String(actualDate)).to.equal(String(expectedDate));

      // nightEnd
      actualDate = new Date(data.times.nightEnd);
      expectedDate = new Date(Date.UTC(2016,2,23,9,58,8,0));
      expect(String(actualDate)).to.equal(String(expectedDate));

      // night
      actualDate = new Date(data.times.night);
      expectedDate = new Date(Date.UTC(2016,2,24,1,3,54,0));
      expect(String(actualDate)).to.equal(String(expectedDate));

      // goldenHourEnd
      actualDate = new Date(data.times.goldenHourEnd);
      expectedDate = new Date(Date.UTC(2016,2,23,11,56,46,0));
      expect(String(actualDate)).to.equal(String(expectedDate));

      // goldenHour
      actualDate = new Date(data.times.goldenHour);
      expectedDate = new Date(Date.UTC(2016,2,23,23,5,16,0));
      expect(String(actualDate)).to.equal(String(expectedDate));

      done(err);
    });
  });
  test('suncalculator/eventcheck no date test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124}), function (err, data) {
      expect(err).to.not.exist();
      expect(data).to.exist();
      expect(data.answer).to.exist();
      done(err);
    });
  });
  test('suncalculator/eventcheck none test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 07:55:40 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist();
      expect(data).to.exist();
      expect(data.answer).to.exist();
      expect(data.answer).to.equal('none');
      done(err);
    });
  });
  test('suncalculator/eventcheck sunrise test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 07:23:40 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist();
      expect(data).to.exist();
      expect(data.answer).to.exist();
      expect(data.answer).to.equal('sunrise');
      done(err);
    });
  });
  test('suncalculator/eventcheck sunset test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 19:38:44 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist();
      expect(data).to.exist();
      expect(data.answer).to.exist();
      expect(data.answer).to.equal('sunset');
      done(err);
    });
  });
  test('suncalculator/eventcheck dawn test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 6:57:56 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist();
      expect(data).to.exist();
      expect(data.answer).to.exist();
      expect(data.answer).to.equal('dawn');
      done(err);
    });
  });
  test('suncalculator/eventcheck dusk test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 20:04:06 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist();
      expect(data).to.exist();
      expect(data.answer).to.exist();
      expect(data.answer).to.equal('dusk');
      done(err);
    });
  });
  test('suncalculator/eventcheck sunriseEnd test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 7:25:54 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist();
      expect(data).to.exist();
      expect(data.answer).to.exist();
      expect(data.answer).to.equal('sunriseEnd');
      done(err);
    });
  });
  test('suncalculator/eventcheck sunsetStart test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 19:36:07 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist();
      expect(data).to.exist();
      expect(data.answer).to.exist();
      expect(data.answer).to.equal('sunsetStart');
      done(err);
    });
  });
  test('suncalculator/eventcheck night test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 21:03:54 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist();
      expect(data).to.exist();
      expect(data.answer).to.exist();
      expect(data.answer).to.equal('night');
      done(err);
    });
  });
  test('suncalculator/eventcheck nightEnd test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 5:58:08 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist();
      expect(data).to.exist();
      expect(data.answer).to.exist();
      expect(data.answer).to.equal('nightEnd');
      done(err);
    });
  });
  test('suncalculator/eventcheck solarNoon test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 13:31:01 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist();
      expect(data).to.exist();
      expect(data.answer).to.exist();
      expect(data.answer).to.equal('solarNoon');
      done(err);
    });
  });

});
