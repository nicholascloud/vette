'use strict';
var lt = require('./lt');

module.exports = function lteq (number, message) {
  number = Number(number);
  if (isNaN(number)) {
    throw new TypeError('number must be numeric');
  }
  message = message || 'value must be less than or equal to ' + number;
  return lt(number, true, message);
};