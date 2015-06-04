'use strict';
var errors = require('../errors');

/**
 * Allows you to provide a function [getValue] that will be responsible for
 * providing the actual data value to [rule], which is a validation rule.
 * @param {Function} getValue
 * @param {Function} rule
 * @returns {Function}
 */
module.exports = function accessor (getValue, rule) {
  if (!getValue) {
    throw new errors.MissingArgumentError('getValue');
  }
  if (!rule) {
    throw new errors.MissingArgumentError('rule');
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