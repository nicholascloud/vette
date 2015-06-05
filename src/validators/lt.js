'use strict';
var compare = require('../compare');

module.exports = function lt (number, inclusive, message) {
  number = Number(number);
  if (isNaN(number)) {
    throw new TypeError('number must be numeric');
  }
  inclusive = inclusive || false;
  message = message || 'value must be less than ' + number;
  return function (adapter) {
    var value = Number(adapter.value());
    if (isNaN(value)) {
      return 'value must be numeric';
    }
    if (!compare(inclusive).lt(value, number)) {
      return message;
    }
  };
};