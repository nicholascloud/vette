'use strict';
var compare = require('../compare');

module.exports = function gt (number, inclusive, message) {
  number = Number(number);
  if (isNaN(number)) {
    throw new TypeError('number must be numeric');
  }
  inclusive = inclusive || false;
  message = message || 'value must be greater than ' + number;
  return function (adapter) {
    var value = Number(adapter.value());
    if (isNaN(value)) {
      return 'value must be numeric';
    }
    if (!compare(inclusive).gt(value, number)) {
      return message;
    }
  };
};