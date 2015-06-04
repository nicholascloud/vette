'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var accessorValidator = require('../../src/validators').accessor;

describe('accessor', function () {

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
    var rule = accessorValidator(getValue, rule);
    rule(hashAdapter(obj));
  });
});