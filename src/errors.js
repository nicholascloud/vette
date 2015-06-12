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
MissingArgumentError.prototype.toString = function () {
  return this.message;
};
exports.MissingArgumentError = MissingArgumentError;

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

exports.ValidatorError = ValidatorError;

/**
 * Duplicate value error
 * @constructor
 * @param {Number} aIndex
 * @param {Number} bIndex
 * @param {String} message
 */
function DuplicateValueError(aIndex, bIndex, message) {
  this.name = 'DuplicateValueError';
  this.message = message ||
    ('value contains duplicates at indices: $1 and $2'
        .replace('$1', aIndex)
        .replace('$2', bIndex)
    );
  this.stack = (new Error()).stack;
  this.aIndex = aIndex;
  this.bIndex = bIndex;
}
DuplicateValueError.prototype = Object.create(Error.prototype);
DuplicateValueError.prototype.constructor = DuplicateValueError;
DuplicateValueError.prototype.toString = function () {
  return this.message;
};
exports.DuplicateValueError = DuplicateValueError;