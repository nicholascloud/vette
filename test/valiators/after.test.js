'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var afterValidator = require('../../src/validators').after;

describe('after', function () {

  it('should fail if before value is not a date', function (done) {
    var expectedMessage = 'before value is not a date';
    var obj = {
      before: null,
      after: '2015-05-01'
    };
    var rule = afterValidator('before');
    var rootAdapter = hashAdapter(obj);
    var afterAdapter = rootAdapter.find('after');
    var actualMessage = rule(afterAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('should fail if after value is not a date', function (done) {
    var expectedMessage = 'after value is not a date';
    var obj = {
      before: '2015-05-01',
      after: null
    };
    var rule = afterValidator('before');
    var rootAdapter = hashAdapter(obj);
    var afterAdapter = rootAdapter.find('after');
    var actualMessage = rule(afterAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('should return a default failure message if none provided', function (done) {
    var expectedMessage = 'date must occur after';
    var obj = {
      before: '2015-05-01',
      after: '2015-04-01'
    };
    var rule = afterValidator('before');
    var rootAdapter = hashAdapter(obj);
    var afterAdapter = rootAdapter.find('after');
    var actualMessage = rule(afterAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('should return undefined when rule succeeds', function (done) {
    var obj = {
      before: '2015-05-01',
      after: '2015-06-01'
    };
    var rule = afterValidator('before');
    var rootAdapter = hashAdapter(obj);
    var afterAdapter = rootAdapter.find('after');
    var actualMessage = rule(afterAdapter, rootAdapter);
    expect(actualMessage).to.be.undefined;
    done();
  });

  it('should return provided error message', function (done) {
    var expectedMessage = 'expected message';
    var obj = {
      before: '2015-05-01',
      after: '2015-04-01'
    };
    var rule = afterValidator('before', false, expectedMessage);
    var rootAdapter = hashAdapter(obj);
    var afterAdapter = rootAdapter.find('after');
    var actualMessage = rule(afterAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('should not be inclusive by default', function (done) {
    var expectedMessage = 'date must occur after';
    var obj = {
      before: '2015-05-01',
      after: '2015-05-01'
    };
    var rule = afterValidator('before');
    var rootAdapter = hashAdapter(obj);
    var afterAdapter = rootAdapter.find('after');
    var actualMessage = rule(afterAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('should be inclusive when specified', function (done) {
    var obj = {
      before: '2015-05-01',
      after: '2015-05-01'
    };
    var rule = afterValidator('before', true);
    var rootAdapter = hashAdapter(obj);
    var afterAdapter = rootAdapter.find('after');
    var actualMessage = rule(afterAdapter, rootAdapter);
    expect(actualMessage).to.be.undefined;
    done();
  });

});