'use strict';
var OBJECT_SYMBOL = '[object Object]';

module.exports = function (target) {
  return Object.prototype.toString.call(target) === OBJECT_SYMBOL;
};