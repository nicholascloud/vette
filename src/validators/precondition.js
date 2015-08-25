'use strict';
var compose = require('./compose');
var isFunction = require('../is-function');

module.exports = function precondition (predicate, rules) {
  rules = Array.prototype.slice.call(arguments, 1);
  if (rules.length === 1) {
    rules = rules[0];
  } else {
    rules = compose.apply(this, rules);
  }
  if (!isFunction(predicate)) {
    var predicateValue = !!predicate;
    predicate = function () {
      return predicateValue;
    };
  }
  return function (adapter, rootAdapter) {
    if (predicate(adapter.value())) {
      return rules(adapter, rootAdapter);
    }
  };
};