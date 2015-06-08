'use strict';
var expect = require('chai').expect;

var Vette = require('../src/index');

describe('Vette^events', function () {

  describe('^evaluating', function () {

    it('should occur before any validation rules have been processed', function (done) {
      var executed = [];
      var expected = ['evaluating', 'fakeRule1', 'fakeRule2'];

      function fakeRule1() {
        executed.push('fakeRule1');
      }

      function fakeRule2() {
        executed.push('fakeRule2');
      }

      var vette = new Vette();
      vette.on('evaluating', function () {
        executed.push('evaluating');
      });
      vette.add('foo', fakeRule1, fakeRule2);

      var obj = {
        foo: 'foo'
      };

      var evaluation = vette.evaluate(obj);
      evaluation.done(function () {
        expect(executed).to.be.an.array;
        expect(executed).to.have.length(expected.length);
        expect(executed).to.have.members(expected);
        expect(executed[0]).to.equal('evaluating');
        done();
      });
      evaluation.fail(function () {
        done('evaluation should have succeeded');
      });

    });
  });

  describe('^evaluated', function () {

    it('should occur after all validation rules have been processed and the promise has been resolved or rejected', function (done) {
      var executed = [];
      var expected = ['fakeRule1', 'fakeRule2'];

      function fakeRule1() {
        executed.push('fakeRule1');
      }

      function fakeRule2() {
        executed.push('fakeRule2');
      }

      var vette = new Vette();
      vette.on('evaluated', function () {
        expect(executed).to.be.an.array;
        expect(executed).to.have.length(expected.length);
        expect(executed).to.have.members(expected);
        done();
      });
      vette.add('foo', fakeRule1, fakeRule2);

      var obj = {
        foo: 'foo'
      };

      var evaluation = vette.evaluate(obj);
      evaluation.fail(function () {
        done('evaluation should have succeeded');
      });

    });
  });

  describe('^validation-failed', function () {

    it('should occur when a validation rule fails', function (done) {

      var executed = [];
      var expected = ['fakeRule1-error', 'fakeRule2-error'];

      function fakeRule1() {
        executed.push('fakeRule1');
        return 'fakeRule1-error';
      }

      function fakeRule2() {
        executed.push('fakeRule2');
        return 'fakeRule2-error';
      }

      var vette = new Vette();
      vette.on('validation-failed', function (selector, violations) {
        expect(selector).to.equal('foo');
        expect(violations).to.be.an.array;
        expect(violations).to.have.length(expected.length);
        expect(violations).to.have.members(expected);
        done();
      });
      vette.add('foo', fakeRule1, fakeRule2);

      var obj = {
        foo: 'foo'
      };

      var evaluation = vette.evaluate(obj);
      evaluation.done(function () {
        done('evaluation should have failed');
      });

    });

    it('should occur for each selector when rules fail', function (done) {

      var expectedSelectors = ['foo', 'bar'];

      function fakeRule1() {
        return 'fakeRule1-error';
      }

      function fakeRule2() {
        return 'fakeRule2-error';
      }

      var expected = {
        'foo': ['fakeRule1-error'],
        'bar': ['fakeRule2-error']
      };

      var actual = [];

      var vette = new Vette();
      vette.on('validation-failed', function (selector, violations) {
        expect(expectedSelectors).to.include.members([selector]);
        expect(violations).to.be.an.array;
        expect(violations).to.have.members(expected[selector]);
        actual.push(selector);
      });
      vette.add('foo', fakeRule1);
      vette.add('bar', fakeRule2);

      var obj = {
        foo: 'foo',
        bar: 'bar'
      };

      var failTriggered = false;

      var evaluation = vette.evaluate(obj);
      evaluation.fail(function () {
        failTriggered = true;
      });
      evaluation.done(function () {
        done('evaluation should have failed');
      }, function () {
        expect(actual).to.have.members(expectedSelectors);
        expect(failTriggered).to.be.true;
        done();
      });
    });
  });

});