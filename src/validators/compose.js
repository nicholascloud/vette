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
    var errors = [];
    each(rules, function (rule) {
      var violation = rule(adapter, rootAdapter);
      if (violation) {
        errors.push(violation);
      }
    });
    errors = flatten(errors);
    if (errors.length) {
      return errors;
    }
  };
};