'use strict';
var empty = require('./empty');

function arrayEach(collection, iteratee) {
  var index = 0,
    maxIndex = collection.length - 1;
  while (index <= maxIndex) {
    iteratee(collection[index], index, collection);
    index += 1;
  }
}

function objectEach(object, iteratee) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      iteratee(object[key], key, object);
    }
  }
}

/**
 * Iterates over a collection, invoking iteratee on each element.
 * @param {Array|Object} target
 * @param {Function} iteratee
 */
module.exports = function each (target, iteratee) {
  if (empty(target)) {
    return;
  }
  if (Array.isArray(target)) {
    return arrayEach(target, iteratee);
  }
  objectEach(target, iteratee);
};