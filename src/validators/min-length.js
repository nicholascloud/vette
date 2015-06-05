'use strict';
module.exports = function minLength (length, message) {
  length = Number(length);
  if (isNaN(length)) {
    throw new TypeError('length must be numeric');
  }
  message = message || 'value has a minimum length of ' + length;
  return function (adapter) {
    if (adapter.value().length < length) {
      return message;
    }
  };
};