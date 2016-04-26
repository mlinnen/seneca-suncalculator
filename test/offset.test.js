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

suite('seneca-suncalculator eventcheck with offset tests ', function() {
    before({}, function(done) {
        si.ready(function(err) {
            if (err) {
                return process.exit(!console.error(err))
            }

            done()
        })
    })

    test('suncalculator/eventcheck sunset with 30 minute offset but not time for sunset test', function(done) {
        si.act(_.extend({ role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 19:38:44 GMT-0400 (Eastern Daylight Time)'), offset: 30 }), function(err, data) {
            expect(err).to.not.exist();
            expect(data).to.exist();
            expect(data.answer).to.exist();
            expect(data.answer).to.equal('none');
            done(err);
        });
    });
    test('suncalculator/eventcheck sunset with 30 minute offset but time for sunset test', function(done) {
        si.act(_.extend({ role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 20:08:44 GMT-0400 (Eastern Daylight Time)'), offset: 30 }), function(err, data) {
            expect(err).to.not.exist();
            expect(data).to.exist();
            expect(data.answer).to.exist();
            expect(data.answer).to.equal('sunset');
            done(err);
        });
    });
    test('suncalculator/eventcheck sunset with -30 minute offset but not time for sunset test', function(done) {
        si.act(_.extend({ role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 19:38:44 GMT-0400 (Eastern Daylight Time)'), offset: -30 }), function(err, data) {
            expect(err).to.not.exist();
            expect(data).to.exist();
            expect(data.answer).to.exist();
            expect(data.answer).to.equal('none');
            done(err);
        });
    });
    test('suncalculator/eventcheck sunset with -30 minute offset but time for sunset test', function(done) {
        si.act(_.extend({ role: 'suncalculator', cmd: 'eventcheck', lat: 35.227085, long: -80.843124, date: new Date('Wed Mar 23 2016 19:08:44 GMT-0400 (Eastern Daylight Time)'), offset: -30 }), function(err, data) {
            expect(err).to.not.exist();
            expect(data).to.exist();
            expect(data.answer).to.exist();
            expect(data.answer).to.equal('sunset');
            done(err);
        });
    });

});
