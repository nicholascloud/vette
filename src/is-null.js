'use strict';
var NULL_SYMBOL = '[object Null]';

module.exports = function (target) {
  return Object.prototype.toString.call(target) === NULL_SYMBOL;
};