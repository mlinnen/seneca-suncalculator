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

suite('seneca-suncalculator calcdays multiple days suite tests ', function() {
    before({}, function(done) {
        si.ready(function(err) {
            if (err) {
                return process.exit(!console.error(err))
            }

            done()
        })
    })

    test('suncalculator/calcdays with date test', function(done) {
        si.act(_.extend({ role: 'suncalculator', cmd: 'calcdays', numberOfDays: 5, lat: 35.227085, long: -80.843124, date: Date.UTC(2016, 2, 23, 11, 20, 0, 0) }), function(err, data) {

            expect(err).to.not.exist();
            expect(data).to.exist();
            expect(data.length).equal(5);
            expect(data[0].times).exist();
            done(err);
        });
    });
    test('suncalculator/calcdays no date test', function(done) {
        si.act(_.extend({ role: 'suncalculator', cmd: 'calcdays', numberOfDays: 5, lat: 35.227085, long: -80.843124, }), function(err, data) {
            expect(err).to.not.exist();
            expect(data).to.exist();
            expect(data.length).equal(5);
            expect(data[0].times).exist();
            done(err);
        });
    });

});
