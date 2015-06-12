'use strict';
var expect = require('chai').expect;

var eachValidator = require('../../src/validators').each;

describe('each', function () {

  it('returns a default message if any element in an array does not pass rule', function (done) {
    var expectedMessage = 'expected message';
    var adapter = {
      value: function () {
        return [1, 2, 3];
      },
      find: function () {}
    };
    var eachRule = function (/*adapter*/) {
      return new Error(expectedMessage);
    };
    var rule = eachValidator(eachRule);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns a custom message if any element in an array does not pass rule', function (done) {
    var expectedMessage = 'custom message';
    var adapter = {
      value: function () {
        return [1, 2, 3];
      },
      find: function () {}
    };
    var eachRule = function (/*adapter*/) {
      return new Error('this message will not be used');
    };
    var rule = eachValidator(eachRule, expectedMessage);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns undefined if all elements in an array pass rule', function (done) {
    var adapter = {
      value: function () {
        return [1, 2, 3];
      },
      find: function () {}
    };
    var eachRule = function (/*adapter*/) {};
    var rule = eachValidator(eachRule);
    var error = rule(adapter);
    expect(error).to.be.undefined;
    done();
  });

  it('terminates when the first rule failure occurs', function (done) {
    var expectedCount = 2;
    var actualCount = 0;
    var adapter = {
      value: function () {
        return [1, 2, 3, 4];
      },
      find: function () {}
    };
    var eachRule = function (adapter) {
      if (adapter.value() >= 3) {
        return new Error('fail');
      }
      actualCount += 1;
    };
    var rule = eachValidator(eachRule);
    rule(adapter);
    expect(actualCount).to.equal(expectedCount);
    done();
  });

  it('returns an error if value is not an array', function (done) {
    var adapter = {
      value: function () {
        return 1;
      },
      find: function () {}
    };
    var eachRule = function (adapter) {};
    var rule = eachValidator(eachRule);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    done();
  });

  it('adds target index to a generated error', function (done) {
    var adapter = {
      value: function () {
        return [1, 2, 3, 4];
      },
      find: function () {}
    };
    var eachRule = function (adapter) {
      if (adapter.value() >= 3) {
        return new Error('fail');
      }
    };
    var rule = eachValidator(eachRule);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.targetIndex).to.equal(2);
    done();
  });

});