'use strict';
var gt = require('./gt');

module.exports = function gteq (number, message) {
  number = Number(number);
  if (isNaN(number)) {
    throw new TypeError('number must be numeric');
  }
  message = message || 'value must be greater than or equal to ' + number;
  return gt(number, true, message);
};