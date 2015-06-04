'use strict';
module.exports = function same (selector, message) {
  selector = selector || '';
  message = message || ('field is not the same');
  return function (adapter, rootAdapter) {
    var otherAdapter = rootAdapter.find(selector);
    if (adapter.value() !== otherAdapter.value()) {
      return message;
    }
  };
};