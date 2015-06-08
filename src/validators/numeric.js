'use strict';
var isNumber = require('../is-number');

module.exports = function numeric (message) {
  message = message || 'value must be numeric';
  return function (adapter) {
    if (!isNumber(adapter.value())) {
      return message;
    }
  };
};