'use strict';
var DATE_SYMBOL = '[object Date]';

module.exports = function (target) {
  return Object.prototype.toString.call(target) === DATE_SYMBOL;
};