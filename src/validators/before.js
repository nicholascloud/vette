'use strict';
var compare = require('../compare');

module.exports = function before (selector, inclusive, message) {
  selector = selector || '';
  inclusive = inclusive || false;
  message = message || 'date must occur before';
  return function (adapter, rootAdapter) {
    var before = Date.parse(adapter.value());
    if (isNaN(before)) {
      return 'before value is not a date';
    }
    var after = Date.parse(rootAdapter.find(selector).value());
    if (isNaN(after)) {
      return 'after value is not a date';
    }
    if (!compare(inclusive).lt(before, after)) {
      return message;
    }
  };
};