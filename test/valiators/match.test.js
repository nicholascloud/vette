'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var matchValidator = require('../../src/validators').match;

describe('match', function () {

  it('should return a default message if the value does not match the regex', function (done) {
    var expected = 'value does not match';
    var obj = {
      foo: 'foo'
    };
    var rootAdapter = hashAdapter(obj);
    var adapter = rootAdapter.find('foo');
    var rule = matchValidator(/bar/);
    var actual = rule(adapter);
    expect(actual).to.equal(expected);
    done();
  });

  it('should return a custom message if the value does not match the regex', function (done) {
    var expected = 'expected message';
    var obj = {
      foo: 'foo'
    };
    var rootAdapter = hashAdapter(obj);
    var adapter = rootAdapter.find('foo');
    var rule = matchValidator(/bar/, expected);
    var actual = rule(adapter);
    expect(actual).to.equal(expected);
    done();
  });

  it('should return undefined if the value matches the regex', function (done) {
    var obj = {
      foo: 'foo'
    };
    var rootAdapter = hashAdapter(obj);
    var adapter = rootAdapter.find('foo');
    var rule = matchValidator(/foo/);
    var actual = rule(adapter);
    expect(actual).to.be.undefined;
    done();
  });
});