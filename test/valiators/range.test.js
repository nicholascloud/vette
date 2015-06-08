'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var rangeValidator = require('../../src/validators').range;

describe('range', function () {

  it('with throw an error if lower is not a number', function (done) {
    var fn = function () {
      rangeValidator(null, 10);
    };
    expect(fn).to.throw(TypeError, /lower/);
    done();
  });

  it('will throw an error if upper is not a number', function (done) {
    var fn = function () {
      rangeValidator(10, null);
    };
    expect(fn).to.throw(TypeError, /upper/);
    done();
  });

  it('will return a default message if validation fails', function (done) {
    var expectedMessage = 'value must be between 5 and 10';
    var adapter = {
      value: function () {
        return 4;
      }
    };
    var rule = rangeValidator(5, 10);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('will return a custom message if validation fails', function (done) {
    var expectedMessage = 'expected message';
    var adapter = {
      value: function () {
        return 4;
      }
    };
    var rule = rangeValidator(5, 10, null, expectedMessage);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('will return a message if value less than lower', function (done) {
    var adapter = {
      value: function () {
        return 4;
      }
    };
    var rule = rangeValidator(5, 10);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.not.be.undefined;
    done();
  });

  it('will return a message if value equal to lower', function (done) {
    var adapter = {
      value: function () {
        return 5;
      }
    };
    var rule = rangeValidator(5, 10);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.not.be.undefined;
    done();
  });

  it('will return a message if value greater than upper', function (done) {
    var adapter = {
      value: function () {
        return 11;
      }
    };
    var rule = rangeValidator(5, 10);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.not.be.undefined;
    done();
  });

  it('will return a message if value equal to upper', function (done) {
    var adapter = {
      value: function () {
        return 10;
      }
    };
    var rule = rangeValidator(5, 10);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.not.be.undefined;
    done();
  });

  it('will return undefined if value between lower and upper, exclusive', function (done) {
    var adapter = {
      value: function () {
        return 7;
      }
    };
    var rule = rangeValidator(5, 10);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.be.undefined;
    done();
  });

  it('will return undefined if value between lower and upper, inclusive', function (done) {
    var adapter = {
      value: function () {
        return 7;
      }
    };
    var rule = rangeValidator(5, 10, true);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.be.undefined;
    done();
  });

  it('will return undfined if value equal to lower, inclusive', function (done) {
    var adapter = {
      value: function () {
        return 5;
      }
    };
    var rule = rangeValidator(5, 10, true);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.be.undefined;
    done();
  });

  it('will return undfined if value equal to upper, inclusive', function (done) {
    var adapter = {
      value: function () {
        return 10;
      }
    };
    var rule = rangeValidator(5, 10, true);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.be.undefined;
    done();
  });
});