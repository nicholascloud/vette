'use strict';
var ElementValidationError = require('../errors').ElementValidationError;

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
        ruleError.targetIndex = index;
        return ruleError;
      }
      index += 1;
    }
  };
};