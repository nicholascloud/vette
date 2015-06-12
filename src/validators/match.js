'use strict';
var ValidatorError = require('../errors').ValidatorError;

module.exports = function match (regex, message) {
  message = message || 'value does not match';
  return function (adapter) {
    if (adapter.value().search(regex) < 0) {
      return new ValidatorError(message);
    }
  };
};