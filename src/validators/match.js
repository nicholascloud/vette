'use strict';
module.exports = function match (regex, message) {
  message = message || ('field format is incorrect');
  return function (adapter) {
    if (adapter.value().search(regex) < 0) {
      return message;
    }
  };
};