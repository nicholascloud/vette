'use strict';
var expect = require('chai').expect;

var hashAdapter = require('../../src/adapters').hash;
var beforeValidator = require('../../src/validators').before;

describe('before', function () {

  it('should fail if before value is not a date', function (done) {
    var expectedMessage = 'before value is not a date';
    var obj = {
      before: null,
      after: '2015-05-01'
    };
    var rule = beforeValidator('after');
    var rootAdapter = hashAdapter(obj);
    var beforeAdapter = rootAdapter.find('before');
    var actualMessage = rule(beforeAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('should fail if after value is not a date', function (done) {
    var expectedMessage = 'after value is not a date';
    var obj = {
      before: '2015-05-01',
      after: null
    };
    var rule = beforeValidator('after');
    var rootAdapter = hashAdapter(obj);
    var beforeAdapter = rootAdapter.find('before');
    var actualMessage = rule(beforeAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('should return a default failure message if none provided', function (done) {
    var expectedMessage = 'date must occur before';
    var obj = {
      before: '2015-05-01',
      after: '2015-04-01'
    };
    var rule = beforeValidator('after');
    var rootAdapter = hashAdapter(obj);
    var beforeAdapter = rootAdapter.find('before');
    var actualMessage = rule(beforeAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('should return undefined when rule succeeds', function (done) {
    var obj = {
      before: '2015-05-01',
      after: '2015-06-01'
    };
    var rule = beforeValidator('after');
    var rootAdapter = hashAdapter(obj);
    var beforeAdapter = rootAdapter.find('before');
    var actualMessage = rule(beforeAdapter, rootAdapter);
    expect(actualMessage).to.be.undefined;
    done();
  });

  it('should return provided error message', function (done) {
    var expectedMessage = 'expected message';
    var obj = {
      before: '2015-05-01',
      after: '2015-04-01'
    };
    var rule = beforeValidator('after', false, expectedMessage);
    var rootAdapter = hashAdapter(obj);
    var beforeAdapter = rootAdapter.find('before');
    var actualMessage = rule(beforeAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('should not be inclusive by default', function (done) {
    var expectedMessage = 'date must occur before';
    var obj = {
      before: '2015-05-01',
      after: '2015-05-01'
    };
    var rule = beforeValidator('after');
    var rootAdapter = hashAdapter(obj);
    var beforeAdapter = rootAdapter.find('before');
    var actualMessage = rule(beforeAdapter, rootAdapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('should be inclusive when specified', function (done) {
    var obj = {
      before: '2015-05-01',
      after: '2015-05-01'
    };
    var rule = beforeValidator('after', true);
    var rootAdapter = hashAdapter(obj);
    var beforeAdapter = rootAdapter.find('before');
    var actualMessage = rule(beforeAdapter, rootAdapter);
    expect(actualMessage).to.be.undefined;
    done();
  });

});