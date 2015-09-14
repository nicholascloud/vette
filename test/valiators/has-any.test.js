'use strict';
var expect = require('chai').expect;

var hasAnyValidator = require('../../src/validators').hasAny;
var ValidationError = require('../../src/errors').ValidationError;

describe('hasAny', function () {

  it('returns an error if value not an array', function (done) {
    var expectedMessage = 'value is not an array';
    var adapter = {
      value: function () {
        return true;
      },
      find: function () {}
    };
    var rule = hasAnyValidator();
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(TypeError);
    expect(err.message).to.equal(expectedMessage);
    done();
  });

  it('returns an error if the array is empty', function (done) {
    var adapter = {
      value: function () {
        return [];
      },
      find: function () {}
    };
    var rule = hasAnyValidator();
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(ValidationError);
    done();
  });

  it('returns default error message if no element passes predicate function', function (done) {
    var expectedMessage = 'no matching elements in collection';
    var adapter = {
      value: function () {
        return [10, 20, 30, 40];
      },
      find: function () {}
    };
    var rule = hasAnyValidator(function (e) {
      return e > 50;
    });
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(ValidationError);
    expect(err.message).to.equal(expectedMessage);
    done();
  });

  it('returns default error message if no element equals predicate value', function (done) {
    var expectedMessage = 'no matching elements in collection';
    var adapter = {
      value: function () {
        return ['a', 'b', 'c', 'd'];
      },
      find: function () {}
    };
    var rule = hasAnyValidator('z');
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(ValidationError);
    expect(err.message).to.equal(expectedMessage);
    done();
  });

  it('returns nothing if any element passes predicate function', function (done) {
    var adapter = {
      value: function () {
        return [1, 3, 6, 7, 9];
      },
      find: function () {}
    };
    var rule = hasAnyValidator(function (e) {
      return e % 2 === 0;
    });
    var err = rule(adapter);
    expect(err).to.be.undefined;
    done();
  });

  it('returns nothing if any element equals predicate value', function (done) {
    var adapter = {
      value: function () {
        return ['w', 'x', 'y', 'Z'];
      },
      find: function () {}
    };
    var rule = hasAnyValidator('Z');
    var err = rule(adapter);
    expect(err).to.be.undefined;
    done();
  });

});