'use strict';
var keys = require('./keys');

/**
 * Is the target empty?
 *   - strings are empty if they have a length of 0
 *   - arrays are empty if they have a length of 0
 *   - objects are empty if they have no keys of their own
 * @param {String|Array|Object} target
 * @returns {Boolean}
 */
module.exports = function empty (target) {
  var length = target.hasOwnProperty('length') ?
    target.length :
    keys(target).length;
  return Number(length) === 0;
};