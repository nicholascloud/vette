'use strict';

/**
 * Missing argument error
 * @param {String} argumentName
 * @constructor
 */
function MissingArgumentError(argumentName) {
  argumentName = argumentName || 'unspecified';
  this.name = 'MissingArgumentError';
  this.message = 'missing argument: ' + argumentName;
  this.argumentName = argumentName;
  this.stack = (new Error()).stack;
}
MissingArgumentError.prototype = Object.create(Error.prototype);
MissingArgumentError.prototype.constructor = MissingArgumentError;

module.exports = {
  MissingArgumentError: MissingArgumentError
};