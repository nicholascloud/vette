'use strict';
var MissingArgumentError = require('../errors').MissingArgumentError;
var ValidationError = require('../errors').ValidationError;

module.exports = function different (selector, message) {
  if (!selector) {
    throw new MissingArgumentError('selector');
  }
  message = message || 'values must be different';
  return function (adapter, rootAdapter) {
    var otherAdapter = rootAdapter.find(selector);
    if (adapter.value() === otherAdapter.value()) {
      return new ValidationError(message);
    }
  };
};