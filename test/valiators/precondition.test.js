'use strict';
var expect = require('chai').expect;

var preconditionValidator = require('../../src/validators').precondition;

describe('precondition', function () {

  it('will not run a rule if the precondition fails', function (done) {
    var actual = false;
    var rule = preconditionValidator(
      function () { return false; },
      function () { actual = true; }
    );
    rule();
    expect(actual).to.be.false;
    done();
  });

  it('will run a rule if the precondition succeeds', function (done) {
    var actual = false;
    var rule = preconditionValidator(
      function () { return true; },
      function () { actual = true; }
    );
    rule();
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
    rule();
    expect(actual).to.equal(3);
    done();
  });

  it('will return violations for any failing rules', function (done) {
    var expectedMessage1 = 'expected message 1';
    var expectedMessage2 = 'expected message 2';
    var rule = preconditionValidator(
      function () { return true; },
      function () { return expectedMessage1; },
      function () { return expectedMessage2; }
    );
    var actualMessages = rule();
    expect(actualMessages).to.be.an.array;
    expect(actualMessages).to.have.members([
      expectedMessage1,
      expectedMessage2
    ]);
    done();
  });

  it('will return undefined if all rules pass', function (done) {
    var rule = preconditionValidator(
      function () { return true; },
      function () {},
      function () {}
    );
    var actual = rule();
    expect(actual).to.be.undefined;
    done();
  });

});