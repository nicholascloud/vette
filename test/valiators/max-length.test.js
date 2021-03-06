'use strict';
var expect = require('chai').expect;

var maxLengthValidator = require('../../src/validators').maxLength;

describe('maxLength', function () {

  it('throws an error if length is not numeric', function (done) {
    var fn = function () {
      maxLengthValidator();
    };
    expect(fn).to.throw(TypeError, /length/);
    done();
  });

  it('returns a default error message if rule fails', function (done) {
    var expectedMessage = 'value has a maximum length of 10';
    var adapter = {
      value: function () {
        return 'this is longer than ten characters';
      }
    };
    var rule = maxLengthValidator(10);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns a custom error message if rule fails', function (done) {
    var expectedMessage = 'expected message';
    var adapter = {
      value: function () {
        return 'this is longer than ten characters';
      }
    };
    var rule = maxLengthValidator(10, expectedMessage);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns undefined if rule succeeds', function (done) {
    var adapter = {
      value: function () {
        return '1234567890';
      }
    };
    var rule = maxLengthValidator(10);
    var error = rule(adapter);
    expect(error).to.be.undefined;
    done();
  });
});