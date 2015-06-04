'use strict';
var lt = require('./lt');

module.exports = function lteq (number, message) {
  number = Number(number);
  message = message || ('field must be less than or equal to ' + number);
  return lt(number, true, message);
};