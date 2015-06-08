'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var sameValidator = require('../../src/validators').same;

describe('same', function () {

  it('should return default message on failure', function (done) {
    var obj = {
      foo: 'foo',
      bar: 'bar'
    };
    var rule = sameValidator('bar');
    var adapter = hashAdapter(obj);
    var message = rule(adapter.find('foo'), adapter);
    expect(message).to.not.be.empty;
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
    var actualMessage = rule(adapter.find('foo'), adapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('should return undefined on success', function (done) {
    var obj = {
      foo: 'foo',
      bar: 'foo'
    };
    var rule = sameValidator('bar');
    var adapter = hashAdapter(obj);
    var message = rule(adapter.find('foo'), adapter);
    expect(message).to.be.undefined;
    done();
  });
});