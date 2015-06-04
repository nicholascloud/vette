'use strict';
var compare = require('./compare');

module.exports = function after (selector, inclusive, message) {
  selector = selector || '';
  inclusive = inclusive || false;
  message = message || ('field must occur after');
  return function (adapter, rootAdapter) {
    var after = Date.parse(adapter.value());
    var before = Date.parse(rootAdapter.find(selector).value());
    if (!compare(inclusive).gt(after, before)) {
      return message;
    }
  };
};