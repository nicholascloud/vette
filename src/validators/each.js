'use strict';
var _each = require('../each');
var ElementValidationError = require('../errors').ElementValidationError;

function asArray(target) {
  if (Array.isArray(target)) {
    return target;
  }
  return [target];
}

function addTargetIndex(ruleErrors, index) {
  _each(asArray(ruleErrors), function (error) {
    error.targetIndex = index;
  });
}

module.exports = function each (rule, message) {
  return function (adapter) {
    var values = adapter.value();
    if (!Array.isArray(values)) {
      return new TypeError('value is not an array');
    }
    var index = 0, maxIndex = values.length - 1;
    while (index <= maxIndex) {
      var value = values[index];
      var adapterFacade = {
        value: function () { return value; },
        find: function () {}
      };
      var ruleError = rule(adapterFacade, adapter);
      if (ruleError) {
        if (message) {
          return new ElementValidationError(index, message);
        }
        // because this rule modifies errors it needs to
        // account for rules that return error collections
        // as well as rules that return individual errors
        addTargetIndex(ruleError, index);
        return ruleError;
      }
      index += 1;
    }
  };
};