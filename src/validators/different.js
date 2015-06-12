'use strict';
var MissingArgumentError = require('../errors').MissingArgumentError;
var ValidatorError = require('../errors').ValidatorError;

module.exports = function different (selector, message) {
  if (!selector) {
    throw new MissingArgumentError('selector');
  }
  message = message || 'values must be different';
  return function (adapter, rootAdapter) {
    var otherAdapter = rootAdapter.find(selector);
    if (adapter.value() === otherAdapter.value()) {
      return new ValidatorError(message);
    }
  };
};