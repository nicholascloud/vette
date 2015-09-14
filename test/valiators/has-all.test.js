'use strict';
var expect = require('chai').expect;

var hasAllValidator = require('../../src/validators').hasAll;
var ValidationError = require('../../src/errors').ValidationError;
var ElementValidationError = require('../../src/errors').ElementValidationError;

describe('hasAll', function () {

  it('returns an error if value not an array', function (done) {
    var expectedMessage = 'value is not an array';
    var adapter = {
      value: function () {
        return true;
      },
      find: function () {}
    };
    var rule = hasAllValidator();
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
    var rule = hasAllValidator();
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(ValidationError);
    done();
  });

  it('returns default error message if any element fails to pass predicate function', function (done) {
    var expectedMessage = 'invalid element at targetIndex: 2';
    var adapter = {
      value: function () {
        return [2, 4, 5, 6, 8];
      },
      find: function () {}
    };
    var rule = hasAllValidator(function (e) {
      return e % 2 === 0;
    });
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(ElementValidationError);
    expect(err.message).to.equal(expectedMessage);
    done();
  });

  it('returns default error message if any element fails to equal predicate value', function (done) {
    var expectedMessage = 'invalid element at targetIndex: 2';
    var adapter = {
      value: function () {
        return [2, 2, 5, 2, 2];
      },
      find: function () {}
    };
    var rule = hasAllValidator(2);
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(ElementValidationError);
    expect(err.message).to.equal(expectedMessage);
    done();
  });

  it('returns error with target index if any predicate application fails', function (done) {
    var adapter = {
      value: function () {
        return [2, 2, 5, 2, 2];
      },
      find: function () {}
    };
    var rule = hasAllValidator(2);
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(ElementValidationError);
    expect(err.targetIndex).to.equal(2);
    done();
  });

  it('returns nothing if all elements pass predicate function', function (done) {
    var adapter = {
      value: function () {
        return [2, 4, 6, 8, 10];
      },
      find: function () {}
    };
    var rule = hasAllValidator(function (e) {
      return e % 2 === 0;
    });
    var err = rule(adapter);
    expect(err).to.be.undefined;
    done();
  });

  it('returns nothing if all elements equal predicate value', function (done) {
    var adapter = {
      value: function () {
        return [true, true, true, true, true];
      },
      find: function () {}
    };
    var rule = hasAllValidator(true);
    var err = rule(adapter);
    expect(err).to.be.undefined;
    done();
  });

});