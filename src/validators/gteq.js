'use strict';
var gt = require('./gt');

module.exports = function gteq (number, message) {
  number = Number(number);
  message = message || ('field must be greater than or equal to ' + number);
  return gt(number, true, message);
};