'use strict';

/**
 * Flattens a mutli-dimensional array
 * @param {Array} collection
 * @param {Boolean} deep
 * @returns {Array}
 */
module.exports = function flatten (collection, deep) {
  deep = deep || false;
  var results = [];
  while (collection.length) {
    var value = collection.shift();
    if (Array.isArray(value)) {
      results = results.concat(deep ? flatten(value, deep) : value);
    } else {
      results.push(value);
    }
  }
  return results;
};