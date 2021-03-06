'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var gtValidator = require('../../src/validators').gt;

describe('gt', function () {

  it('throws an error if number is not numeric', function (done) {
    var fn = function () {
      gtValidator();
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
    var rule = gtValidator(1);
    var error = rule(fooAdapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns a default message if value is less that number', function (done) {
    var expectedMessage = 'value must be greater than 1';
    var obj = {
      foo: 0
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = gtValidator(1);
    var error = rule(fooAdapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns a message if value is equal than number and rule is exclusive', function (done) {
    var expectedMessage = 'value must be greater than 1';
    var obj = {
      foo: 1
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = gtValidator(1, false);
    var error = rule(fooAdapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns a custom message if value is less than number', function (done) {
    var expectedMessage = 'expected message';
    var obj = {
      foo: 0
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = gtValidator(1, null, expectedMessage);
    var error = rule(fooAdapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns undefined if value is greater than number', function (done) {
    var obj = {
      foo: 2
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = gtValidator(1);
    var error = rule(fooAdapter);
    expect(error).to.be.undefined;
    done();
  });

  it('returns undefined if value is equal to the number and rule is inclusive', function (done) {
    var obj = {
      foo: 1
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = gtValidator(1, true);
    var error = rule(fooAdapter);
    expect(error).to.be.undefined;
    done();
  });
});