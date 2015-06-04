'use strict';
var compare = require('../compare');

module.exports = function gt (number, inclusive, message) {
  number = Number(number);
  inclusive = inclusive || false;
  message = message || ('field must be greater than ' + number);
  return function (adapter) {
    var value = Number(adapter.value());
    if (!compare(inclusive).gt(value, number)) {
      return message;
    }
  };
};