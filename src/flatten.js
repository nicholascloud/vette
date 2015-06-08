'use strict';

/**
 * Flattens a multi-dimensional array
 * @param {Array} collection
 * @param {Boolean} deep
 * @returns {Array}
 */
module.exports = function flatten (collection, deep) {
  deep = deep || false;
  var results = [];
  var index = 0, maxIndex = (collection.length - 1);
  while (index <= maxIndex) {
    var value = collection[index];
    if (Array.isArray(value)) {
      results = results.concat(deep ? flatten(value, deep) : value);
    } else {
      results.push(value);
    }
    index += 1;
  }
  return results;
};