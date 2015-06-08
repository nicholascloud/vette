'use strict';
var expect = require('chai').expect;

var Vette = require('../src/index');

describe('index#evaluate()', function () {

  it('fulfills promise with no violations', function (done) {

    var executed = [];
    function fakeRule(name) {
      return function () {
        executed.push(name);
      };
    }

    var vette = new Vette();
    vette.add('foo', fakeRule('fakeRule1'));
    vette.add('foo', fakeRule('fakeRule2'));

    var obj = {
      foo: 'foo'
    };

    var evaluation = vette.evaluate(obj);
    evaluation.done(function () {
      expect(executed).to.have.length(2);
      expect(executed).to.have.members(['fakeRule1', 'fakeRule2']);
      done();
    });
    evaluation.fail(function () {
      done('evaluation should have succeeded');
    });
  });

  it('rejects promise with violations', function (done) {

    var executed = [];
    function fakeRule(name) {
      return function () {
        executed.push(name);
        return 'error';
      };
    }

    var vette = new Vette();
    vette.add('foo', fakeRule('fakeRule1'));
    vette.add('foo', fakeRule('fakeRule2'));

    var obj = {
      foo: 'foo'
    };

    var evaluation = vette.evaluate(obj);
    evaluation.done(function () {
      done('evaluation should have failed');
    });
    evaluation.fail(function () {
      expect(executed).to.have.length(2);
      expect(executed).to.have.members(['fakeRule1', 'fakeRule2']);
      done();
    });
  });
});