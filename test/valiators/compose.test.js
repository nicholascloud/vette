'use strict';
var expect = require('chai').expect;

var composeValidator = require('../../src/validators').compose;

describe('compose', function () {

  it('should run all rules', function (done) {
    var rule1 = function () {
      rule1.hasRun = true;
    };
    var rule2 = function () {
      rule2.hasRun = true;
    };
    var rule3 = function () {
      rule3.hasRun = true;
    };
    var composedRule = composeValidator(rule1, rule2, rule3);
    composedRule(null, null);
    expect(rule1.hasRun).to.be.true;
    expect(rule2.hasRun).to.be.true;
    expect(rule3.hasRun).to.be.true;
    done();
  });

  it('should aggregate messages for failing rules', function (done) {
    var rule1 = function () {
      return 'rule1';
    };
    var rule2 = function () {};
    var rule3 = function () {
      return 'rule3';
    };
    var composedRule = composeValidator(rule1, rule2, rule3);
    var messages = composedRule(null, null);
    expect(messages).to.have.length(2);
    expect(messages).to.deep.include.members(['rule1', 'rule3']);
    done();
  });

  it('should aggregate messages for failing, nested composed rules', function (done) {
    var rule1 = function () {
      return 'rule1';
    };
    var rule2 = function () {};
    var rule3 = function () {
      return 'rule3';
    };
    var rule4 = function () {
      return 'rule4'
    };
    var nestedComposedRule = composeValidator(rule3, rule4);
    var composedRule = composeValidator(rule1, rule2, nestedComposedRule);
    var messages = composedRule(null, null);
    expect(messages).to.have.length(3);
    expect(messages).to.deep.include.members(['rule1', 'rule3', 'rule4']);
    done();
  });

  it('should returned undefined if no rules failed', function (done) {
    var rule1 = function () {};
    var rule2 = function () {};
    var rule3 = function () {};
    var composedRule = composeValidator(rule1, rule2, rule3);
    var messages = composedRule(null, null);
    expect(messages).to.be.undefined;
    done();
  });
});