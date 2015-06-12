'use strict';
var isNumber = require('../is-number');
var ValidatorError = require('../errors').ValidatorError;

module.exports = function minLength (length, message) {
  length = Number(length);
  if (!isNumber(length)) {
    throw new TypeError('length must be numeric');
  }
  message = message || 'value has a minimum length of ' + length;
  return function (adapter) {
    if (adapter.value().length < length) {
      return new ValidatorError(message);
    }
  };
};