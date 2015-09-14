'use strict';
var expect = require('chai').expect;

var hasNoneValidator = require('../../src/validators').hasNone;
var MultipleElementValidationError = require('../../src/errors').MultipleElementValidationError;

describe('hasNone', function () {

  it('returns an error if value not an array', function (done) {
    var expectedMessage = 'value is not an array';
    var adapter = {
      value: function () {
        return true;
      },
      find: function () {}
    };
    var rule = hasNoneValidator();
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(TypeError);
    expect(err.message).to.equal(expectedMessage);
    done();
  });

  it('returns nothing if the array is empty', function (done) {
    var adapter = {
      value: function () {
        return [];
      },
      find: function () {}
    };
    var rule = hasNoneValidator();
    var err = rule(adapter);
    expect(err).to.be.undefined;
    done();
  });

  it('returns default error if any match is found with function predicate', function (done) {
    var expectedMessage = 'expected 0 element(s) but found 1';
    var adapter = {
      value: function () {
        return ['a', 1, {}];
      },
      find: function () {}
    };
    var rule = hasNoneValidator(function (e) {
      return e === 1;
    });
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(MultipleElementValidationError);
    expect(err.message).to.equal(expectedMessage);
    done();
  });

  it('returns default error if any match is found with primitive predicate', function (done) {
    var expectedMessage = 'expected 0 element(s) but found 1';
    var adapter = {
      value: function () {
        return ['a', 1, {}];
      },
      find: function () {}
    };
    var rule = hasNoneValidator('a');
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(MultipleElementValidationError);
    expect(err.message).to.equal(expectedMessage);
    done();
  });

  it('returns error with collection details if any match is found', function (done) {
    var expectedIndices = [1];
    var adapter = {
      value: function () {
        return ['a', 1, {}];
      },
      find: function () {}
    };
    var rule = hasNoneValidator(function (e) {
      return e === 1;
    });
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(MultipleElementValidationError);
    expect(err.expectedCount).to.equal(0);
    expect(err.actualCount).to.equal(expectedIndices.length);
    expect(err.matchIndices).to.be.an.array;
    expect(err.matchIndices).to.have.members(expectedIndices);
    done();
  });

  it('returns nothing if no match is found with predicate function', function (done) {
    var adapter = {
      value: function () {
        return ['a', 1, {}];
      },
      find: function () {}
    };
    var rule = hasNoneValidator(function (e) {
      return e === 404;
    });
    var err = rule(adapter);
    expect(err).to.be.undefined;
    done();
  });

  it('returns nothing if no match is found with predicate value', function (done) {
    var adapter = {
      value: function () {
        return ['a', 1, {}];
      },
      find: function () {}
    };
    var rule = hasNoneValidator(404);
    var err = rule(adapter);
    expect(err).to.be.undefined;
    done();
  });

});