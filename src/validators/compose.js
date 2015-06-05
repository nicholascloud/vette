'use strict';
var each = require('../each');
var flatten = require('../flatten');

/**
 * Composes multiple rules to be evaluated as a unit.
 * @param {...Function} rules
 * @returns {Function}
 */
module.exports = function compose (rules) {
  rules = Array.prototype.slice.call(arguments, 0);
  return function (adapter, rootAdapter) {
    var messages = [];
    each(rules, function (rule) {
      var violation = rule(adapter, rootAdapter);
      if (violation) {
        messages.push(violation);
      }
    });
    messages = flatten(messages);
    if (messages.length) {
      return messages;
    }
  };
};