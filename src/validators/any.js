'use strict';
var contains = require('../contains');
var ValidationError = require('../errors').ValidationError;

module.exports = function any (options, message) {
  message = message || 'value is not a valid choice';
  options = options || [];
  return function (adapter) {
    if (options.length === 0) {
      return new ValidationError(message);
    }
    if (!contains(options, adapter.value())) {
      return new ValidationError(message);
    }
  };
};