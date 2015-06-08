'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var lteqValidator = require('../../src/validators').lteq;

describe('gteq', function () {

  it('throws an error if number is not numeric', function (done) {
    var fn = function () {
      lteqValidator();
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
    var rule = lteqValidator(1);
    var actualMessage = rule(fooAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns a default message if value is greater that number', function (done) {
    var expectedMessage = 'value must be less than or equal to 0';
    var obj = {
      foo: 1
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = lteqValidator(0);
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
    var rule = lteqValidator(1);
    var actualMessage = rule(fooAdapter);
    expect(actualMessage).to.be.undefined;
    done();
  });

  it('returns undefined if value is less than the number', function (done) {
    var obj = {
      foo: 1
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = lteqValidator(2);
    var actualMessage = rule(fooAdapter);
    expect(actualMessage).to.be.undefined;
    done();
  });
});