'use strict';
var isNumber = require('../is-number');
var compare = require('../compare');
var ValidatorError = require('../errors').ValidatorError;

module.exports = function before (selector, inclusive, message) {
  selector = selector || '';
  inclusive = inclusive || false;
  message = message || 'date must occur before';
  return function (adapter, rootAdapter) {
    var before = Date.parse(adapter.value());
    if (!isNumber(before)) {
      return 'before value is not a date';
    }
    var after = Date.parse(rootAdapter.find(selector).value());
    if (!isNumber(after)) {
      return 'after value is not a date';
    }
    if (!compare(inclusive).lt(before, after)) {
      return message;
    }
  };
};