'use strict';
var expect = require('chai').expect;

var preconditionValidator = require('../../src/validators').precondition;

describe('precondition', function () {

  var mockAdapter;

  beforeEach(function (done) {
    mockAdapter = {
      value: function () {}
    };
    done();
  });

  it('will not run a rule if the precondition fails', function (done) {
    var actual = false;
    var rule = preconditionValidator(
      function () { return false; },
      function () { actual = true; }
    );
    rule(mockAdapter);
    expect(actual).to.be.false;
    done();
  });

  it('will run a rule if the precondition succeeds', function (done) {
    var actual = false;
    var rule = preconditionValidator(
      function () { return true; },
      function () { actual = true; }
    );
    rule(mockAdapter);
    expect(actual).to.be.true;
    done();
  });

  it('will run all rules if the precondition succeeds', function (done) {
    var actual = 0;
    var rule = preconditionValidator(
      function () { return true; },
      function () { actual += 1; },
      function () { actual += 1; },
      function () { actual += 1; }
    );
    rule(mockAdapter);
    expect(actual).to.equal(3);
    done();
  });

  it('will return a violation for a single failing rule', function (done) {
    var e1 = new Error('expected message 1');
    var rule = preconditionValidator(
      function () { return true; },
      function () { return e1; }
    );
    var error = rule(mockAdapter);
    expect(error).to.be.instanceOf(Error);
    expect(error).to.equal(e1);
    done();
  });

  it('will return an array of violations for all failing rules', function (done) {
    var e1 = new Error('expected message 1');
    var e2 = new Error('expected message 2');
    var rule = preconditionValidator(
      function () { return true; },
      function () { return e1; },
      function () { return e2; }
    );
    var errors = rule(mockAdapter);
    expect(errors).to.be.an.array;
    expect(errors).to.have.members([e1, e2]);
    done();
  });

  it('will return undefined if all rules pass', function (done) {
    var rule = preconditionValidator(
      function () { return true; },
      function () {},
      function () {}
    );
    var error = rule(mockAdapter);
    expect(error).to.be.undefined;
    done();
  });

  it('will pass the adapter value to the precondition', function (done) {
    var valuePassed = false;
    var expectedValue = 1;
    mockAdapter.value = function () {
      return expectedValue;
    };
    var rule = preconditionValidator(
      function (actualValue) {
        valuePassed = (actualValue === expectedValue);
        return true;
      },
      function () {}
    );
    rule(mockAdapter);
    expect(valuePassed).to.be.true;
    done();
  });

  it('will execute rules if the predicate is a non-function, truthy value', function (done) {
    var truthy = [true, 'true', 1, [], {}];
    while (truthy.length) {
      var preconditionPassed = false;
      var rule = preconditionValidator(
        truthy.shift(),
        function () {
          preconditionPassed = true;
        }
      );
      rule(mockAdapter);
      expect(preconditionPassed).to.be.true;
    }
    done();
  });

  it('will not execute rules if the predicate is a non-function, falsy value', function (done) {
    var falsy = [false, '', 0, null, undefined];
    while (falsy.length) {
      var preconditionPassed = false;
      var rule = preconditionValidator(
        falsy.shift(),
        function () {
          preconditionPassed = true;
        }
      );
      rule(mockAdapter);
      expect(preconditionPassed).to.be.false;
    }
    done();
  });
});