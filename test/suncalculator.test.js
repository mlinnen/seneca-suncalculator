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
      expect(err).to.not.exist()
      expect(data).to.exist()
      done(err)
    })
  })

  test('suncalculator/calc with date test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'calc', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 07:23:40 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist()
      expect(data).to.exist()
      expect(data.times).to.exist()
      expect(data.times.sunrise).to.exist()
      //expect(data.times.sunrise).to.equal('Wed Mar 23 2016 19:38:44 GMT-0400 (Eastern Daylight Time)')
      //console.log(data)
      done(err)
    })
  })
  test('suncalculator/eventcheck no date test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124}), function (err, data) {
      expect(err).to.not.exist()
      expect(data).to.exist()
      expect(data.answer).to.exist()
      done(err)
    })
  })
  test('suncalculator/eventcheck none test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 07:55:40 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist()
      expect(data).to.exist()
      expect(data.answer).to.exist()
      expect(data.answer).to.equal('none')
      done(err)
    })
  })
  test('suncalculator/eventcheck sunrise test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 07:23:40 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist()
      expect(data).to.exist()
      expect(data.answer).to.exist()
      expect(data.answer).to.equal('sunrise')
      done(err)
    })
  })
  test('suncalculator/eventcheck sunset test', function (done) {
    si.act(_.extend({role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 19:38:44 GMT-0400 (Eastern Daylight Time)')}), function (err, data) {
      expect(err).to.not.exist()
      expect(data).to.exist()
      expect(data.answer).to.exist()
      expect(data.answer).to.equal('sunset')
      done(err)
    })
  })

})