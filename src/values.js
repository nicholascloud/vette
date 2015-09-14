'use strict';

/**
 * Extracts an object's values.
 * @param {Object} object
 * @returns {Array}
 */
module.exports = function values (object) {
  var collectedValues = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      collectedValues.push(object[key]);
    }
  }
  return collectedValues;
};