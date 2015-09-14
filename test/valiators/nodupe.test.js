'use strict';
var expect = require('chai').expect;

var nodupeValidator = require('../../src/validators').nodupe;

describe('nodupe', function () {

  it('returns an error if value not an array', function (done) {
    var expectedMessage = 'value is not an array';
    var adapter = {
      value: function () {
        return true;
      },
      find: function () {}
    };
    var rule = nodupeValidator();
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(Error);
    expect(err.message).to.equal(expectedMessage);
    done();
  });

  it('returns an error with default message if duplicates are found', function (done) {
    var expectedMessage = 'duplicates elements at indices: 0 and 3';
    var adapter = {
      value: function () {
        return [1, 2, 3, 1];
      },
      find: function () {}
    };
    var rule = nodupeValidator();
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(Error);
    expect(err.targetIndex).to.equal(0);
    expect(err.compareIndex).to.equal(3);
    expect(err.message).to.equal(expectedMessage);
    expect(err.toString()).to.equal(expectedMessage);
    done();
  });

  it('returns an error with custom message if duplicates are found', function (done) {
    var expectedMessage = 'custom message';
    var adapter = {
      value: function () {
        return [1, 2, 3, 1];
      },
      find: function () {}
    };
    var rule = nodupeValidator(expectedMessage);
    var err = rule(adapter);
    expect(err).to.be.an.instanceOf(Error);
    expect(err.targetIndex).to.equal(0);
    expect(err.compareIndex).to.equal(3);
    expect(err.message).to.equal(expectedMessage);
    expect(err.toString()).to.equal(expectedMessage);
    done();
  });

  it('returns undefined if no duplicates are found', function (done) {
    var adapter = {
      value: function () {
        return ['a', true, 3, {}];
      },
      find: function () {}
    };
    var rule = nodupeValidator();
    var actual = rule(adapter);
    expect(actual).to.be.undefined;
    done();
  });
});