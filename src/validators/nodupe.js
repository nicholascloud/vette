'use strict';
var sameValueZero = require('../same-value-zero');
var DuplicateValueError = require('../errors').DuplicateValueError;

module.exports = function nodupe (message) {
  return function (adapter) {
    var value = adapter.value();
    if (!Array.isArray(value)) {
      return new TypeError('value is not an array');
    }
    if (value.length === 0) {
      return;
    }
    var aIndex = 0,
      bIndex = 0,
      maxIndex = value.length - 1;

    while (aIndex <= maxIndex) {
      bIndex = aIndex + 1;
      while (bIndex <= maxIndex) {
        var aValue = value[aIndex],
          bValue = value[bIndex];
        if (sameValueZero(aValue, bValue)) {
          return new DuplicateValueError(aIndex, bIndex, message);
        }
        bIndex += 1;
      }
      aIndex += 1;
    }
  }
};