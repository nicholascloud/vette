'use strict';
var compare = require('../compare');

module.exports = function range (lower, upper, inclusive, message) {
  lower = Number(lower);
  upper = Number(upper);
  inclusive = inclusive || false;
  message = message || ('field must be between ' + lower + ' and ' + upper);
  return function (adapter) {
    var value = Number(adapter.value());
    if (!compare(inclusive).btw(value, lower, upper)) {
      return message;
    }
  };
};