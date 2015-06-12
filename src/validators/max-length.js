'use strict';
var isNumber = require('../is-number');
var ValidationError = require('../errors').ValidationError;

module.exports = function maxLength (length, message) {
  length = Number(length);
  if (!isNumber(length)) {
    throw new TypeError('length must be numeric');
  }
  message = message || 'value has a maximum length of ' + length;
  return function (adapter) {
    if (adapter.value().length > length) {
      return new ValidationError(message);
    }
  };
};