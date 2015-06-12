'use strict';

/**
 * Validator error
 * @constructor
 * @param {String} message
 */
function ValidatorError(message) {
  this.name = 'ValidatorError';
  this.message = message || 'validation failed';
  this.stack = (new Error()).stack;
}
ValidatorError.prototype = Object.create(Error.prototype);
ValidatorError.prototype.constructor = ValidatorError;
ValidatorError.prototype.toString = function () {
  return this.message;
};

module.exports = ValidatorError;