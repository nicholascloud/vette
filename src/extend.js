'use strict';
var empty = require('./empty');
var keys = require('./keys');
var each = require('./each');

/**
 * Extends an object with other target objects by copying key/value pairs.
 *   Last object wins.
 * @param targets
 * @returns {*}
 */
module.exports = function extend (targets) {
  targets = Array.prototype.slice.call(arguments, 0);
  if (empty(targets)) {
    return {};
  }
  var rootTarget = targets.shift();
  function copy(nextTarget) {
    each(keys(nextTarget), function (key) {
      rootTarget[key] = nextTarget[key];
    });
  }
  while (targets.length) {
    copy(targets.shift());
  }
  return rootTarget;
};