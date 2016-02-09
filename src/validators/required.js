'use strict';
var isNull = require('../is-null');
var isUndefined = require('../is-undefined');
var isArray = require('../is-array');
var isString = require('../is-string');
var isNumber = require('../is-number');
var isObject = require('../is-object');
var keys = require('../keys');

var minLength = require('./min-length');

var ValidationError = require('../errors').ValidationError;

/**
 *
 * @param {String} message
 * @param {Boolean} [errOnEmpty] - If the value is a string, array, or object,
 *   should an error be generated if it has a length of 0 (no own keys for object)?
 *   Default is: true
 * @returns {Function}
 */
module.exports = function required (message, errOnEmpty) {
  message = message || 'value is required';
  if (arguments.length === 1) {
    errOnEmpty = true;
  }
  return function (adapter) {
    var value = adapter.value();
    if (isNull(value) || isUndefined(value)) {
      return new ValidationError(message);
    }

    if (!errOnEmpty) {
      return;
    }

    if (isArray(value) || isString(value)) {
      return minLength(1, message)(adapter);
    }

    if (isNumber(value)) {
      if (value === 0) {
        return new ValidationError(message);
      }
    }

    if (isObject(value) && keys(value).length === 0) {
      return new ValidationError(message);
    }
  };
};