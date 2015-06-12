'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var sameValidator = require('../../src/validators').same;

describe('same', function () {

  it('should return default message on failure', function (done) {
    var expectedMessage = 'value is not the same';
    var obj = {
      foo: 'foo',
      bar: 'bar'
    };
    var rule = sameValidator('bar');
    var adapter = hashAdapter(obj);
    var error = rule(adapter.find('foo'), adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('should return a custom message on failure', function (done) {
    var obj = {
      foo: 'foo',
      bar: 'bar'
    };
    var expectedMessage = 'expected message';
    var rule = sameValidator('bar', expectedMessage);
    var adapter = hashAdapter(obj);
    var error = rule(adapter.find('foo'), adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('should return undefined on success', function (done) {
    var obj = {
      foo: 'foo',
      bar: 'foo'
    };
    var rule = sameValidator('bar');
    var adapter = hashAdapter(obj);
    var error = rule(adapter.find('foo'), adapter);
    expect(error).to.be.undefined;
    done();
  });
});