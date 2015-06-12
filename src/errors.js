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
function ValidationError(message) {
  this.name = 'ValidationError';
  this.message = message || 'validation failed';
  this.stack = (new Error()).stack;
}
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;
ValidationError.prototype.toString = function () {
  return this.message;
};

exports.ValidationError = ValidationError;

/**
 * Duplicate value error
 * @constructor
 * @param {Number} targetIndex
 * @param {Number} compareIndex
 * @param {String} message
 */
function DuplicateElementValidationError(targetIndex, compareIndex, message) {
  this.name = 'DuplicateElementValidationError';
  this.message = message ||
    ('duplicates elements at indices: $1 and $2'
        .replace('$1', targetIndex)
        .replace('$2', compareIndex)
    );
  this.stack = (new Error()).stack;
  this.targetIndex = targetIndex;
  this.compareIndex = compareIndex;
}
DuplicateElementValidationError.prototype = Object.create(Error.prototype);
DuplicateElementValidationError.prototype.constructor = DuplicateElementValidationError;
DuplicateElementValidationError.prototype.toString = function () {
  return this.message;
};
exports.DuplicateElementValidationError = DuplicateElementValidationError;

/**
 * Element error
 * @param targetIndex
 * @param message
 * @constructor
 */
function ElementValidationError(targetIndex, message) {
  this.name = 'ElementValidationError';
  this.message = message ||
    ('invalid element at targetIndex: $1'.replace('$1', targetIndex));
  this.stack = (new Error()).stack;
  this.targetIndex = targetIndex;
}
ElementValidationError.prototype = Object.create(Error.prototype);
ElementValidationError.prototype.constructor = ElementValidationError;
ElementValidationError.prototype.toString = function () {
  return this.message;
};
exports.ElementValidationError = ElementValidationError;