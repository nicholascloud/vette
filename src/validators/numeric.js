'use strict';
var isNumber = require('../is-number');
var ValidationError = require('../errors').ValidationError;

module.exports = function numeric (message) {
  message = message || 'value must be numeric';
  return function (adapter) {
    if (!isNumber(adapter.value())) {
      return new ValidationError(message);
    }
  };
};