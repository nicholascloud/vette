'use strict';
module.exports = function different (selector, message) {
  selector = selector || '';
  message = message || 'field must be different';
  return function (adapter, rootAdapter) {
    var otherAdapter = rootAdapter.find(selector);
    if (adapter.value() === otherAdapter.value()) {
      return message;
    }
  };
};