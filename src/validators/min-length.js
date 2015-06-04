'use strict';
module.exports = function minLength (length, message) {
  length = Number(length);
  message = message || ('field has a minimum length of ' + length);
  return function (adapter) {
    if (adapter.value().length < length) {
      return message;
    }
  };
};