'use strict';
var isFunction = require('../is-function');
var sameValueZero = require('../same-value-zero');
var ValidationError = require('../errors').ValidationError;
var ElementValidationError = require('../errors').ElementValidationError;

module.exports = function hasAll (predicate, message) {
  return function (adapter) {
    var collection = adapter.value();

    if (!Array.isArray(collection)) {
      return new TypeError('value is not an array');
    }

    if (collection.length === 0) {
      return new ValidationError('collection is empty');
    }

    if (!isFunction(predicate)) {
      predicate = sameValueZero.bind(null, predicate);
    }

    var index = 0,
      maxIndex = collection.length - 1;

    while (index <= maxIndex) {
      if (!predicate(collection[index])) {
        return new ElementValidationError(index, message);
      }
      index += 1;
    }
  };
};