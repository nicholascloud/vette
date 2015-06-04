'use strict';
var compare = require('./compare');

module.exports = function before (selector, inclusive, message) {
  selector = selector || '';
  inclusive = inclusive || false;
  message = message || ('field must occur before');
  return function (adapter, rootAdapter) {
    var before = Date.parse(adapter.value());
    var after = Date.parse(rootAdapter.find(selector).value());
    if (!compare(inclusive).lt(before, after)) {
      return message;
    }
  };
};