'use strict';
var match = require('./match');

var EMAIL_REGEX = /^[^(@|\s)]+@[^(@|\s)]+\.[a-z0-9]+$/i;

module.exports = function email (message) {
  message = message || 'email address is invalid';
  return match(EMAIL_REGEX, message);
};