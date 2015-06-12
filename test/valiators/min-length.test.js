'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var minLengthValidator = require('../../src/validators').minLength;

describe('minLength', function () {

  it('throws an error if length is not numeric', function (done) {
    var fn = function () {
      minLengthValidator();
    };
    expect(fn).to.throw(TypeError, /length/);
    done();
  });

  it('returns a default error message if rule fails', function (done) {
    var expectedMessage = 'value has a minimum length of 10';
    var adapter = {
      value: function () {
        return 'too short';
      }
    };
    var rule = minLengthValidator(10);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns a custom error message if rule fails', function (done) {
    var expectedMessage = 'expected message';
    var adapter = {
      value: function () {
        return 'too short';
      }
    };
    var rule = minLengthValidator(10, expectedMessage);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns undefined if rule succeeds', function (done) {
    var adapter = {
      value: function () {
        return '12345678901';
      }
    };
    var rule = minLengthValidator(10);
    var error = rule(adapter);
    expect(error).to.be.undefined;
    done();
  });
});