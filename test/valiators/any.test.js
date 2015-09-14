'use strict';
var expect = require('chai').expect;

var anyValidator = require('../../src/validators').any;

describe('any', function () {

  it('returns default message on failure', function (done) {
    var expectedMessage = 'value is not a valid choice';
    var adapter = {
      value: function () {
        return 'foo';
      }
    };
    var options = ['bar'];
    var rule = anyValidator(options);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns provided message on failure', function (done) {
    var expectedMessage = 'expexted message';
    var adapter = {
      value: function () {
        return 'foo';
      }
    };
    var options = ['bar'];
    var rule = anyValidator(options, expectedMessage);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns message if options are empty', function (done) {
    var expectedMessage = 'value is not a valid choice';
    var adapter = {
      value: function () {
        return 'foo';
      }
    };
    var options = [];
    var rule = anyValidator(options);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns message if options are falsy', function (done) {
    var expectedMessage = 'value is not a valid choice';
    var adapter = {
      value: function () {
        return 'foo';
      }
    };
    var options = null;
    var rule = anyValidator(options);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns message if value is not in options', function (done) {
    var expectedMessage = 'value is not a valid choice';
    var adapter = {
      value: function () {
        return 'foo';
      }
    };
    var options = ['bar'];
    var rule = anyValidator(options);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns undefined if value is in options', function (done) {
    var options = ['foo', 'bar'];
    var adapter = {
      value: function () {
        return 'foo';
      }
    };
    var rule = anyValidator(options);
    var error = rule(adapter);
    expect(error).to.be.undefined;
    done();
  });

  it('returns error if value not found in options provided by a function', function (done) {
    var expectedMessage = 'value is not a valid choice';
    var options = function () {
      return ['bar'];
    };
    var adapter = {
      value: function () {
        return 'foo';
      }
    };
    var rule = anyValidator(options);
    var error = rule(adapter);
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal(expectedMessage);
    done();
  });

  it('returns undefined if value found in options provided by a function', function (done) {
    var options = function () {
      return ['bar'];
    };
    var adapter = {
      value: function () {
        return 'bar';
      }
    };
    var rule = anyValidator(options);
    var error = rule(adapter);
    expect(error).to.be.undefined;
    done();
  });
});