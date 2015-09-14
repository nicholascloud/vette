'use strict';
var expect = require('chai').expect;

var hasOneValidator = require('../../src/validators').hasOne;
var ValidationError = require('../../src/errors').ValidationError;
var MultipleElementValidationError = require('../../src/errors').MultipleElementValidationError;

describe('hasOne', function () {

  it('returns an error if value not an array', function (done) {
    var expectedMessage = 'value is not an array';
    var adapter = {
      value: function () {
        return true;
      },
      find: function () {}
    };
    var rule = hasOneValidator(null, null);
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(TypeError);
    expect(err.message).to.equal(expectedMessage);
    done();
  });

  it('returns an error if the array is empty', function (done) {
    var expectedMessage = 'collection is empty';
    var adapter = {
      value: function () {
        return [];
      },
      find: function () {}
    };
    var rule = hasOneValidator(null, null);
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(ValidationError);
    expect(err.message).to.equal(expectedMessage);
    done();
  });

  it('returns nothing if a single match is found with predicate function', function (done) {
    var adapter = {
      value: function () {
        return ['a', 1, {}];
      },
      find: function () {}
    };
    var rule = hasOneValidator(function (e) {
      return e === 1;
    }, 'message');
    var err = rule(adapter);
    expect(err).to.be.undefined;
    done();
  });

  it('returns nothing if a single match is found with predicate value', function (done) {
    var adapter = {
      value: function () {
        return ['a', 1, {}];
      },
      find: function () {}
    };
    var rule = hasOneValidator('a', 'empty message');
    var err = rule(adapter);
    expect(err).to.be.undefined;
    done();
  });

  it('returns default error if more than one match is found', function (done) {
    var expectedMessage = 'expected 1 element(s) but found 3';
    var adapter = {
      value: function () {
        return ['a', 1, {}, 1, 'q', 1];
      },
      find: function () {}
    };
    var rule = hasOneValidator(function (e) {
      return e === 1;
    });
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(MultipleElementValidationError);
    expect(err.message).to.equal(expectedMessage);
    done();
  });

  it('returns custom error if more than one match is found', function (done) {
    var expectedMessage = 'custom error message';
    var adapter = {
      value: function () {
        return ['a', 1, {}, 1, 'q', 1];
      },
      find: function () {}
    };
    var rule = hasOneValidator(function (e) {
      return e === 1;
    }, expectedMessage);
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(MultipleElementValidationError);
    expect(err.message).to.equal(expectedMessage);
    done();
  });

  it('returns error with collection details if more than one match is found', function (done) {
    var expectedIndices = [1, 3, 5];
    var adapter = {
      value: function () {
        return ['a', 1, {}, 1, 'q', 1];
      },
      find: function () {}
    };
    var rule = hasOneValidator(function (e) {
      return e === 1;
    });
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(MultipleElementValidationError);
    expect(err.expectedCount).to.equal(1);
    expect(err.actualCount).to.equal(expectedIndices.length);
    expect(err.matchIndices).to.be.an.array;
    expect(err.matchIndices).to.have.members(expectedIndices);
    done();
  });
});