'use strict';
var STRING_SYMBOL = '[object String]';

module.exports = function (target) {
  return Object.prototype.toString.call(target) === STRING_SYMBOL;
};