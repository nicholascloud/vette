'use strict';

module.exports = function numeric (message) {
  message = message || ('field must be numeric');
  return function (adapter) {
    if (isNaN(adapter.value())) {
      return message;
    }
  };
};