'use strict';
var expect = require('chai').expect;

var MissingArgumentError = require('../../src/errors').MissingArgumentError;
var hashAdapter = require('../../src/adapters').hash;
var accessorValidator = require('../../src/validators').accessor;

describe('accessor', function () {

  it('should throw an error if getValue is not provided', function (done) {
    var fn = function () {
      accessorValidator();
    };
    expect(fn).to.throw(MissingArgumentError, /getValue/);
    done();
  });

  it('should throw an error if rule is not provided', function (done) {
    var fn = function () {
      accessorValidator(function () {});
    };
    expect(fn).to.throw(MissingArgumentError, /rule/);
    done();
  });

  it('should pass the accessor value to the rule', function (done) {
    var obj = {
      foo: 'foo'
    };
    var expectedValue = 'intercepted';
    function getValue(/*adapter, parentAdapter*/) {
      return expectedValue;
    }
    function rule(adapter/*, parentAdapter*/) {
      var actualValue = adapter.value();
      expect(actualValue).to.equal(expectedValue);
      done();
    }
    var accessorRule = accessorValidator(getValue, rule);
    accessorRule(hashAdapter(obj));
  });
});