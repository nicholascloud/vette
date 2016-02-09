'use strict';
var isNull = require('./is-null');
var isUndefined = require('./is-undefined');
var isNumber = require('./is-number');

var NUM_REGEX = /^[-]?[0-9]+$/;

module.exports = function isNumeric (target) {
  if(isNull(target)) {
    return false;
  }
  if(isUndefined(target)) {
    return false;
  }
  return isNumber(target) || target.toString()
    .trim()
    .search(NUM_REGEX) > -1;
};