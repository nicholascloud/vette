'use strict';
var isFunction = require('../is-function');
var sameValueZero = require('../same-value-zero');
var MultipleElementValidationError = require('../errors').MultipleElementValidationError;

module.exports = function hasNone (predicate, message) {
  return function (adapter) {
    var collection = adapter.value();

    if (!Array.isArray(collection)) {
      return new TypeError('value is not an array');
    }

    if (collection.length === 0) {
      return;
    }

    if (!isFunction(predicate)) {
      predicate = sameValueZero.bind(null, predicate);
    }

    var index = 0,
      maxIndex = collection.length - 1,
      found = [];

    while (index <= maxIndex) {
      if (predicate(collection[index])) {
        found.push(index);
      }
      index += 1;
    }

    if (found.length !== 0) {
      return new MultipleElementValidationError(0, found.length, found, message);
    }
  };
};