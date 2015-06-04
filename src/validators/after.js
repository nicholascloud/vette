'use strict';
var compare = require('./compare');

module.exports = function after (selector, inclusive, message) {
  selector = selector || '';
  inclusive = inclusive || false;
  message = message || 'date must occur after';
  return function (adapter, rootAdapter) {
    var after = Date.parse(adapter.value());
    if (isNaN(after)) {
      return 'after value is not a date';
    }
    var before = Date.parse(rootAdapter.find(selector).value());
    if (isNaN(before)) {
      return 'before value is not a date';
    }
    if (!compare(inclusive).gt(after, before)) {
      return message;
    }
  };
};