'use strict';
var isNumber = require('../is-number');
var compare = require('../compare');
var ValidatorError = require('../errors').ValidatorError;

module.exports = function lt (number, inclusive, message) {
  number = Number(number);
  if (!isNumber(number)) {
    throw new TypeError('number must be numeric');
  }
  inclusive = inclusive || false;
  message = message || 'value must be less than ' + number;
  return function (adapter) {
    var value = Number(adapter.value());
    if (!isNumber(value)) {
      return new TypeError('value must be numeric');
    }
    if (!compare(inclusive).lt(value, number)) {
      return new ValidatorError(message);
    }
  };
};