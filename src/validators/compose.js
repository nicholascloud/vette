'use strict';
var _ = require('lodash');

/**
 * Composes multiple rules to be evaluated as a unit.
 * @param {...Function} rules
 * @returns {Function}
 */
module.exports = function compose (rules) {
  rules = Array.prototype.slice.call(arguments, 0);
  return function (adapter, rootAdapter) {
    var messages = [];
    _.each(rules, function (rule) {
      var violation = rule(adapter, rootAdapter);
      if (violation) {
        messages.push(violation);
      }
    });
    messages = _.flatten(messages);
    if (messages.length) {
      return messages;
    }
  };
};