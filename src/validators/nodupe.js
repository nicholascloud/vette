'use strict';
var sameValueZero = require('../same-value-zero');
var DuplicateElementValidationError = require('../errors').DuplicateElementValidationError;

module.exports = function nodupe (message) {
  return function (adapter) {
    var value = adapter.value();
    if (!Array.isArray(value)) {
      return new TypeError('value is not an array');
    }
    if (value.length === 0) {
      return;
    }
    var index = 0,
      compareIndex = 0,
      maxIndex = value.length - 1;

    while (index <= maxIndex) {
      compareIndex = index + 1;
      while (compareIndex <= maxIndex) {
        var a = value[index],
          b = value[compareIndex];
        if (sameValueZero(a, b)) {
          return new DuplicateElementValidationError(
            index,
            compareIndex,
            message
          );
        }
        compareIndex += 1;
      }
      index += 1;
    }
  };
};