'use strict';
var isNumber = require('../is-number');
var compare = require('../compare');
var ValidatorError = require('../errors').ValidatorError;

module.exports = function gt (number, inclusive, message) {
  number = Number(number);
  if (!isNumber(number)) {
    throw new TypeError('number must be numeric');
  }
  inclusive = inclusive || false;
  message = message || 'value must be greater than ' + number;
  return function (adapter) {
    var value = Number(adapter.value());
    if (!isNumber(value)) {
      return new ValidatorError('value must be numeric');
    }
    if (!compare(inclusive).gt(value, number)) {
      return new ValidatorError(message);
    }
  };
};