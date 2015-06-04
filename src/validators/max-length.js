'use strict';
module.exports = function maxLength (length, message) {
  length = Number(length);
  message = message || ('field has a maximum length of ' + length);
  return function (adapter) {
    if (adapter.value().length > length) {
      return message;
    }
  };
};