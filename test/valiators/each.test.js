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
      return expectedMessage;
    };
    var rule = eachValidator(eachRule);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.equal(expectedMessage);
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
      return 'this message will not be used';
    };
    var rule = eachValidator(eachRule, expectedMessage);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.equal(expectedMessage);
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
    var actualMessage = rule(adapter);
    expect(actualMessage).to.be.undefined;
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
        return 'fail';
      }
      actualCount += 1;
    };
    var rule = eachValidator(eachRule);
    rule(adapter);
    expect(actualCount).to.equal(expectedCount);
    done();
  });

  it('applies rule to a primitive value, as if it were an array', function (done) {
    var adapter = {
      value: function () {
        return 1;
      },
      find: function () {}
    };
    var eachRule = function (adapter) {
      var actual = adapter.value();
      expect(actual).to.equal(1);
      done();
    };
    var rule = eachValidator(eachRule);
    rule(adapter);
  });
});