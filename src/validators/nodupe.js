'use strict';
var sameValueZero = require('../same-value-zero');

/**
 * Duplicate value error
 * @constructor
 * @param {Number} aIndex
 * @param {Number} bIndex
 * @param {String} message
 */
function DuplicateValueError(aIndex, bIndex, message) {
  this.name = 'DuplicateValueError';
  this.message = message ||
    ('value contains duplicates at indices: $1 and $2'
        .replace('$1', aIndex)
        .replace('$2', bIndex)
    );
  this.stack = (new Error()).stack;
  this.aIndex = aIndex;
  this.bIndex = bIndex;
}
DuplicateValueError.prototype = Object.create(Error.prototype);
DuplicateValueError.prototype.constructor = DuplicateValueError;
DuplicateValueError.prototype.toString = function () {
  return this.message;
};

module.exports = function nodupe (message) {
  return function (adapter) {
    var value = adapter.value();
    if (!Array.isArray(value)) {
      return;
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