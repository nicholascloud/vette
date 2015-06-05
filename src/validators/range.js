'use strict';
var compare = require('../compare');

module.exports = function range (lower, upper, inclusive, message) {
  lower = Number(lower);
  if (isNaN(lower)) {
    throw new TypeError('lower must be numeric');
  }
  upper = Number(upper);
  if (isNaN(length)) {
    throw new TypeError('upper must be numeric');
  }
  inclusive = inclusive || false;
  message = message || 'value must be between ' + lower + ' and ' + upper;
  return function (adapter) {
    var value = Number(adapter.value());
    if (isNaN(value)) {
      return 'value is not numeric';
    }
    if (!compare(inclusive).btw(value, lower, upper)) {
      return message;
    }
  };
};