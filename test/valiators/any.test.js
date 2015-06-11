'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var anyValidator = require('../../src/validators').any;

describe('any', function () {

  it('returns default message on failure', function (done) {
    var expectedMessage = 'value is not a valid choice';
    var obj = {
      foo: 'foo'
    };
    var options = ['bar'];
    var adapter = hashAdapter(obj.foo);
    var rule = anyValidator(options);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns provided message on failure', function (done) {
    var expectedMessage = 'expexted message';
    var obj = {
      foo: 'foo'
    };
    var options = ['bar'];
    var adapter = hashAdapter(obj.foo);
    var rule = anyValidator(options, expectedMessage);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns message if options are empty', function (done) {
    var expectedMessage = 'value is not a valid choice';
    var obj = {
      foo: 'foo'
    };
    var options = [];
    var adapter = hashAdapter(obj.foo);
    var rule = anyValidator(options);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns message if options are falsy', function (done) {
    var expectedMessage = 'value is not a valid choice';
    var obj = {
      foo: 'foo'
    };
    var options = null;
    var adapter = hashAdapter(obj.foo);
    var rule = anyValidator(options);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns message if value is not in options', function (done) {
    var expectedMessage = 'value is not a valid choice';
    var obj = {
      foo: 'foo'
    };
    var options = ['bar'];
    var adapter = hashAdapter(obj.foo);
    var rule = anyValidator(options);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns undefined if value is in options', function (done) {
    var obj = {
      foo: 'foo'
    };
    var options = ['foo', 'bar'];
    var adapter = hashAdapter(obj.foo);
    var rule = anyValidator(options);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.be.undefined;
    done();
  });
});