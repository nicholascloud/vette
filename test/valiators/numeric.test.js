'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var numericValidator = require('../../src/validators').numeric;

describe('numeric', function () {

  it('returns a default error message when rule fails', function (done) {
    var expectedMessage = 'value must be numeric';
    var adapter = {
      value: function () {
        return false;
      }
    };
    var rule = numericValidator();
    var actualMessage = rule(adapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns a custom error message when rule fails', function (done) {
    var expectedMessage = 'expected message';
    var adapter = {
      value: function () {
        return false;
      }
    };
    var rule = numericValidator(expectedMessage);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns undefined if rule succeeds', function (done) {
    var adapter ={
      value: function () {
        return 10;
      }
    };
    var rule = numericValidator();
    var actual = rule(adapter);
    expect(actual).to.be.undefined;
    done();
  });
});