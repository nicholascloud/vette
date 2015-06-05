'use strict';
var MissingArgumentError = require('../errors').MissingArgumentError;

/**
 * Allows you to provide a function [getValue] that will be responsible for
 * providing the actual data value to [rule], which is a validation rule.
 * @param {Function} getValue
 * @param {Function} rule
 * @returns {Function}
 */
module.exports = function accessor (getValue, rule) {
  if (!getValue) {
    throw new MissingArgumentError('getValue');
  }
  if (!rule) {
    throw new MissingArgumentError('rule');
  }
  return function (adapter, rootAdapter) {
    var value = getValue(adapter, rootAdapter);
    var accessorAdapter = {
      find: function () {},
      value: function () {
        return value;
      }
    };
    return rule(accessorAdapter, rootAdapter);
  };
};