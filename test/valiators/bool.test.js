'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var boolValidator = require('../../src/validators').bool;

describe('bool', function () {

  it('returns undefined if value is true', function (done) {
    var obj = {
      foo: true
    };
    var rootAdapter = hashAdapter(obj);
    var boolAdapter = rootAdapter.find('foo');
    var rule = boolValidator();
    var actualMessage = rule(boolAdapter, rootAdapter);
    expect(actualMessage).to.be.undefined;
    done();
  });

  it('returns undefined if value is false', function (done) {
    var obj = {
      foo: false
    };
    var rootAdapter = hashAdapter(obj);
    var boolAdapter = rootAdapter.find('foo');
    var rule = boolValidator();
    var actualMessage = rule(boolAdapter, rootAdapter);
    expect(actualMessage).to.be.undefined;
    done();
  });

  it('returns default message when none is provided', function (done) {
    var expectedMessage = 'value must be boolean';
    var obj = {
      foo: 'not boolean'
    };
    var rootAdapter = hashAdapter(obj);
    var boolAdapter = rootAdapter.find('foo');
    var rule = boolValidator();
    var actualMessage = rule(boolAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns provided message', function (done) {
    var expectedMessage = 'expected message';
    var obj = {
      foo: 'not boolean'
    };
    var rootAdapter = hashAdapter(obj);
    var boolAdapter = rootAdapter.find('foo');
    var rule = boolValidator(expectedMessage);
    var actualMessage = rule(boolAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });
});