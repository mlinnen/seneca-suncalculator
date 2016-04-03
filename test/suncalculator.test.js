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

      console.log(data.date);
      console.log(data.times);
      
      var offset = new Date().getTimezoneOffset();
      console.log(offset);
      
      expect(err).to.not.exist();
      expect(data).to.exist();
      expect(data.times).to.exist();
      var actualDate = new Date(data.times.sunrise);
      var expectedDate = new Date(Date.UTC(2016,2,23,11,23,18,0));
      console.log(expectedDate);
      console.log(actualDate);
      expect(String(actualDate)).to.equal(String(expectedDate));
      /*
      expect(String(data.times.sunset)).to.equal('Wed Mar 23 2016 19:38:44 GMT-0400 (Eastern Daylight Time)');
      expect(String(data.times.solarNoon)).to.equal('Wed Mar 23 2016 13:31:01 GMT-0400 (Eastern Daylight Time)');
      expect(String(data.times.nadir)).to.equal('Wed Mar 23 2016 01:31:01 GMT-0400 (Eastern Daylight Time)');
      expect(String(data.times.sunriseEnd)).to.equal('Wed Mar 23 2016 07:25:54 GMT-0400 (Eastern Daylight Time)');
      expect(String(data.times.sunsetStart)).to.equal('Wed Mar 23 2016 19:36:07 GMT-0400 (Eastern Daylight Time)');
      expect(String(data.times.dawn)).to.equal('Wed Mar 23 2016 06:57:56 GMT-0400 (Eastern Daylight Time)');
      expect(String(data.times.dusk)).to.equal('Wed Mar 23 2016 20:04:06 GMT-0400 (Eastern Daylight Time)');
      expect(String(data.times.nauticalDawn)).to.equal('Wed Mar 23 2016 06:28:15 GMT-0400 (Eastern Daylight Time)');
      expect(String(data.times.nauticalDusk)).to.equal('Wed Mar 23 2016 20:33:47 GMT-0400 (Eastern Daylight Time)');
      expect(String(data.times.nightEnd)).to.equal('Wed Mar 23 2016 05:58:08 GMT-0400 (Eastern Daylight Time)');
      expect(String(data.times.night)).to.equal('Wed Mar 23 2016 21:03:54 GMT-0400 (Eastern Daylight Time)');
      expect(String(data.times.goldenHourEnd)).to.equal('Wed Mar 23 2016 07:56:46 GMT-0400 (Eastern Daylight Time)');
      expect(String(data.times.goldenHour)).to.equal('Wed Mar 23 2016 19:05:16 GMT-0400 (Eastern Daylight Time)');
      */
      
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

});
