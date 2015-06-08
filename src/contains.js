'use strict';
var empty = require('./empty');
var sameValueZero = require('./same-value-zero');

module.exports = function contains (collection, value) {
  if (!Array.isArray(collection)) {
    throw new TypeError('collection must be an array');
  }
  if (empty(collection)) {
    return false;
  }
  var index = 0, maxIndex = collection.length - 1;
  while (index <= maxIndex) {
    if (sameValueZero(collection[index], value)) {
      return true;
    }
    index += 1;
  }
  return false;
};