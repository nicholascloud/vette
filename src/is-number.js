'use strict';
var NUMBER_SYMBOL = '[object Number]';

module.exports = function isNumber(target) {
  return (Object.prototype.toString.call(target) === NUMBER_SYMBOL) &&
      !isNaN(target);
};