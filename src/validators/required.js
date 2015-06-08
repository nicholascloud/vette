'use strict';
var minLength = require('./min-length');

module.exports = function required (message) {
  message = message || 'value is required';
  // TODO: account for more than just strings
  return minLength(1, message);
};