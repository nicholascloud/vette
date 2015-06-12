'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var differentValidator = require('../../src/validators').different;
var MissingArgumentError = require('../../src/errors').MissingArgumentError;

describe('different', function () {

  it('throws an error if selector is missing', function (done) {
    var fn = function () {
      differentValidator();
    };
    expect(fn).to.throw(MissingArgumentError, /selector/);
    done();
  });

  it('returns message if values are same', function (done) {
    var expectedMessage = 'values must be different';
    var obj = {
      foo: 1,
      bar: 1
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = differentValidator('bar');
    var error = rule(fooAdapter, rootAdapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns custom message if values are same', function (done) {
    var expectedMessage = 'expected message';
    var obj = {
      foo: 1,
      bar: 1
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = differentValidator('bar', expectedMessage);
    var error = rule(fooAdapter, rootAdapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns undefined if values are different', function (done) {
    var obj = {
      foo: 1,
      bar: 2
    };
    var rootAdapter = hashAdapter(obj);
    var fooAdapter = rootAdapter.find('foo');
    var rule = differentValidator('bar');
    var error = rule(fooAdapter, rootAdapter);
    expect(error).to.be.undefined;
    done();
  });
});