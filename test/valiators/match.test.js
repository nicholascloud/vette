'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var matchValidator = require('../../src/validators').match;

describe('match', function () {

  it('should return a default message if the value does not match the regex', function (done) {
    var expectedMessage = 'value does not match';
    var obj = {
      foo: 'foo'
    };
    var rootAdapter = hashAdapter(obj);
    var adapter = rootAdapter.find('foo');
    var rule = matchValidator(/bar/);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('should return a custom message if the value does not match the regex', function (done) {
    var expectedMessage = 'expected message';
    var obj = {
      foo: 'foo'
    };
    var rootAdapter = hashAdapter(obj);
    var adapter = rootAdapter.find('foo');
    var rule = matchValidator(/bar/, expectedMessage);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('should return undefined if the value matches the regex', function (done) {
    var obj = {
      foo: 'foo'
    };
    var rootAdapter = hashAdapter(obj);
    var adapter = rootAdapter.find('foo');
    var rule = matchValidator(/foo/);
    var error = rule(adapter);
    expect(error).to.be.undefined;
    done();
  });
});