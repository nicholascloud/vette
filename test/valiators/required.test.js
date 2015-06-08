'use strict';
var expect = require('chai').expect;

var requiredValidator = require('../../src/validators').required;

describe('required', function () {

  it('returns a default message if value is empty', function (done) {
    var expectedMessage = 'value is required';
    var adapter = {
      value: function () {
        return '';
      }
    };
    var rule = requiredValidator();
    var actualMessage = rule(adapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns a custom message if value is empty', function (done) {
    var expectedMessage = 'expected message';
    var adapter = {
      value: function () {
        return '';
      }
    };
    var rule = requiredValidator(expectedMessage);
    var actualMessage = rule(adapter);
    expect(actualMessage).to.equal(expectedMessage);
    done();
  });

  it('returns undefined if the value is not empty', function (done) {
    var adapter = {
      value: function () {
        return 'not empty';
      }
    };
    var rule = requiredValidator();
    var actualMessage = rule(adapter);
    expect(actualMessage).to.be.undefined;
    done();
  });

});