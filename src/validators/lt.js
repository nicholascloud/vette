'use strict';
var compare = require('./compare');

module.exports = function lt (number, inclusive, message) {
  number = Number(number);
  inclusive = inclusive || false;
  message = message || ('field must be less than ' + number);
  return function (adapter) {
    var value = Number(adapter.value());
    if (!compare(inclusive).lt(value, number)) {
      return message;
    }
  };
};