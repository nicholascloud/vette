'use strict';
var isNumber = require('../is-number');
var compare = require('../compare');
var ValidatorError = require('../errors').ValidatorError;

module.exports = function after (selector, inclusive, message) {
  selector = selector || '';
  inclusive = inclusive || false;
  message = message || 'date must occur after';
  return function (adapter, rootAdapter) {
    var after = Date.parse(adapter.value());
    if (!isNumber(after)) {
      return new TypeError('after value is not a date');
    }
    var before = Date.parse(rootAdapter.find(selector).value());
    if (!isNumber(before)) {
      return new TypeError('before value is not a date');
    }
    if (!compare(inclusive).gt(after, before)) {
      return new ValidatorError(message);
    }
  };
};