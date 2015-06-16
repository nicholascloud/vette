'use strict';
var NUMBER_CLASS = '[object Number]';

module.exports = function isNumber(target) {
  return (Object.prototype.toString.call(target) === NUMBER_CLASS) &&
      !isNaN(target);
};