'use strict';
module.exports = function match (regex, message) {
  message = message || 'value does not match';
  return function (adapter) {
    if (adapter.value().search(regex) < 0) {
      return message;
    }
  };
};