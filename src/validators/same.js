'use strict';
var sameValueZero = require('../same-value-zero');
var ValidationError = require('../errors').ValidationError;

module.exports = function same (selector, message) {
  selector = selector || '';
  message = message || 'value is not the same';
  return function (adapter, rootAdapter) {
    var otherAdapter = rootAdapter.find(selector);
    if (!sameValueZero(adapter.value(), otherAdapter.value())) {
      return new ValidationError(message);
    }
  };
};