'use strict';
var sameValueZero = require('../same-value-zero');
var ValidatorError = require('../errors').ValidatorError;

module.exports = function same (selector, message) {
  selector = selector || '';
  message = message || 'value is not the same';
  return function (adapter, rootAdapter) {
    var otherAdapter = rootAdapter.find(selector);
    if (!sameValueZero(adapter.value(), otherAdapter.value())) {
      return new ValidatorError(message);
    }
  };
};