'use strict';
var NULL_CLASS = '[object Null]';
var UNDEFINED_CLASS = '[object Undefined]';
var NUM_REGEX = /^[-]?[0-9]+$/;

function is(target, typeClass) {
  return Object.prototype.toString.call(target) === typeClass;
}

module.exports = function isNumeric (target) {
  return !is(target, NULL_CLASS) &&
      !is(target, UNDEFINED_CLASS) &&
      target.toString()
        .trim()
        .search(NUM_REGEX) > -1;
};