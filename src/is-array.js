'use strict';
var ARRAY_SYMBOL = '[object Array]';

module.exports = function (target) {
  if (Array.isArray) {
    return Array.isArray(target);
  }
  return Object.prototype.toString.call(target) === ARRAY_SYMBOL;
};