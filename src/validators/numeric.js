'use strict';
var _ = require('../../lib/lodash');

module.exports = function numeric (message) {
  message = message || 'value must be numeric';
  return function (adapter) {
    if (!_.isNumber(adapter.value())) {
      return message;
    }
  };
};