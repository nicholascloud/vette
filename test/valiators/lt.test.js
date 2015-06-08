'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var ltValidator = require('../../src/validators').lt;

describe('lt', function () {

  it('throws an error if number is not numeric', function (done) {
    var fn = function () {
      ltValidator();
    };
    expect(fn).to.throw(TypeError, /number/);
    done();
  });

  it('returns a message if value is not numeric', function (done) {
    var expectedMessage = 'value must be numeric';
    var obj = {
      foo: 'not numeric'
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = ltValidator(1);
    var actualMessage = rule(fooAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns a default message if value is greater than number', function (done) {
    var expectedMessage = 'value must be less than 0';
    var obj = {
      foo: 1
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = ltValidator(0);
    var actualMessage = rule(fooAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns a message if value is equal to number and rule is exclusive', function (done) {
    var expectedMessage = 'value must be less than 1';
    var obj = {
      foo: 1
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = ltValidator(1, false);
    var actualMessage = rule(fooAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns a custom message if value is greater than number', function (done) {
    var expectedMessage = 'expected message';
    var obj = {
      foo: 1
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = ltValidator(0, null, expectedMessage);
    var actualMessage = rule(fooAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns undefined if value is less than number', function (done) {
    var obj = {
      foo: 1
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = ltValidator(2);
    var actualMessage = rule(fooAdapter);
    expect(actualMessage).to.be.undefined;
    done();
  });

  it('returns undefined if value is equal to the number and rule is inclusive', function (done) {
    var obj = {
      foo: 1
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = ltValidator(1, true);
    var actualMessage = rule(fooAdapter);
    expect(actualMessage).to.be.undefined;
    done();
  });
});