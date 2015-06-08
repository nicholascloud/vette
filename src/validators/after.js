'use strict';
var isNumber = require('../is-number');
var compare = require('../compare');

module.exports = function after (selector, inclusive, message) {
  selector = selector || '';
  inclusive = inclusive || false;
  message = message || 'date must occur after';
  return function (adapter, rootAdapter) {
    var after = Date.parse(adapter.value());
    if (!isNumber(after)) {
      return 'after value is not a date';
    }
    var before = Date.parse(rootAdapter.find(selector).value());
    if (!isNumber(before)) {
      return 'before value is not a date';
    }
    if (!compare(inclusive).gt(after, before)) {
      return message;
    }
  };
};