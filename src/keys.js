'use strict';

/**
 * Returns an object's own keys
 * @param {Object} object
 * @returns {Array}
 */
module.exports = function keys (object) {
  var ownKeys = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      ownKeys.push(key);
    }
  }
  return ownKeys;
};