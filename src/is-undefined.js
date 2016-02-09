'use strict';
var UNDEFINED_SYMBOL = '[object Undefined]';

module.exports = function (target) {
  return Object.prototype.toString.call(target) === UNDEFINED_SYMBOL;
};