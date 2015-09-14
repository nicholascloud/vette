'use strict';
var isFunction = require('../is-function');
var sameValueZero = require('../same-value-zero');
var ValidationError = require('../errors').ValidationError;

module.exports = function hasAny (predicate, message) {
  message = message || 'no matching elements in collection';
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
      if (predicate(collection[index])) {
        return;
      }
      index += 1;
    }

    return new ValidationError(message);
  };
};