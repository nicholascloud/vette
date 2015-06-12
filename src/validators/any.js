'use strict';
var contains = require('../contains');
var ValidatorError = require('./validator-error');

module.exports = function any (options, message) {
  message = message || 'value is not a valid choice';
  options = options || [];
  return function (adapter) {
    if (options.length === 0) {
      return new ValidatorError(message);
    }
    if (!contains(options, adapter.value())) {
      return new ValidatorError(message);
    }
  };
};