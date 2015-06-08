'use strict';
var isNumber = require('./is-number');

var NUM_REGEX = /^[-]?[0-9]+$/;

module.exports = function isNumeric (target) {
  return target !== null &&
      typeof target !== 'undefined' &&
      target.toString()
        .trim()
        .search(NUM_REGEX) > -1;
};