'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var gteqValidator = require('../../src/validators').gteq;

describe('gteq', function () {

  it('throws an error if number is not numeric', function (done) {
    var fn = function () {
      gteqValidator();
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
    var rule = gteqValidator(1);
    var actualMessage = rule(fooAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns a default message if value is less that number', function (done) {
    var expectedMessage = 'value must be greater than or equal to 1';
    var obj = {
      foo: 0
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = gteqValidator(1);
    var actualMessage = rule(fooAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns undefined if value is equal to the number', function (done) {
    var obj = {
      foo: 1
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = gteqValidator(1);
    var actualMessage = rule(fooAdapter);
    expect(actualMessage).to.be.undefined;
    done();
  });

  it('returns undefined if value is greater than the number', function (done) {
    var obj = {
      foo: 2
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = gteqValidator(1);
    var actualMessage = rule(fooAdapter);
    expect(actualMessage).to.be.undefined;
    done();
  });
});