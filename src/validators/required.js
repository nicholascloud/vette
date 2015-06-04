'use strict';
var minLength = require('./min-length');

module.exports = function required (message) {
  message = message || ('field must have a value');
  return minLength(1, message);
};