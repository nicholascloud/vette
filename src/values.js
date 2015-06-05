'use strict';

/**
 * Extracts an object's values.
 * @param {Object} object
 * @returns {Array}
 */
module.exports = function values (object) {
  var values = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      values.push(object[key]);
    }
  }
  return values;
};