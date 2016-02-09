'use strict';
var BOOLEAN_SYMBOL = '[object Boolean]';

module.exports = function (target) {
  return Object.prototype.toString.call(target) === BOOLEAN_SYMBOL;
};