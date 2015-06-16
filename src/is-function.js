'use strict';
var FUNCTION_CLASS = '[object Function]';

/**
 * Is target a function?
 * @param {*} target
 * @returns {Boolean}
 */
module.exports = function isFunction (target) {
  return Object.prototype.toString.call(target) === FUNCTION_CLASS;
};