'use strict';
var isNumber = require('../is-number');
var isNumeric = require('../is-numeric');
var compare = require('../compare');
var ValidationError = require('../errors').ValidationError;

module.exports = function range (lower, upper, inclusive, message) {
  // lower MAY NOT be a string
  if (!isNumber(lower)) {
    throw new TypeError('lower must be numeric');
  }
  // upper MAY NOT be a string
  if (!isNumber(upper)) {
    throw new TypeError('upper must be numeric');
  }
  inclusive = inclusive || false;
  message = message || 'value must be between ' + lower + ' and ' + upper;
  return function (adapter) {
    // value MAY be a string
    var value = adapter.value();
    if (!isNumeric(value)) {
      return new TypeError('value is not numeric');
    }
    if (!compare(inclusive).btw(Number(value), lower, upper)) {
      return new ValidationError(message);
    }
  };
};