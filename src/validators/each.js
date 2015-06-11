'use strict';

module.exports = function each (rule, message) {
  return function (adapter) {
    var values = adapter.value();
    if (!Array.isArray(values)) {
      values = [values];
    }
    var index = 0, maxIndex = values.length - 1;
    while (index <= maxIndex) {
      var value = values[index];
      var adapterFacade = {
        value: function () { return value; },
        find: function () {}
      };
      var ruleMessage = rule(adapterFacade, adapter);
      if (ruleMessage) {
        return message || ruleMessage;
      }
      index += 1;
    }
  };
};