'use strict';
var contains = require('../contains');

module.exports = function any (options, message) {
  message = message || 'value is not a valid choice';
  options = options || [];
  return function (adapter) {
    if (options.length === 0) {
      return message;
    }
    if (!contains(options, adapter.value())) {
      return message;
    }
  };
};