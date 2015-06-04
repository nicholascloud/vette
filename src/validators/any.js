'use strict';
var _ = require('lodash');

module.exports = function any (options, message) {
  message = message || ('field is not a valid choice');
  options = options || [];
  return function (adapter) {
    if (options.length === 0) {
      return message;
    }
    if (!_.contains(options, adapter.value())) {
      return message;
    }
  };
};