'use strict';
module.exports = function compare(inclusive) {
  var api = Object.create({
    btw: function (a, low, high) {
      return this.gt(high, a) &&
        this.lt(low, a);
    }
  });
  if (inclusive) {
    api.gt = function (a, b) { return a >= b; };
    api.lt = function (a, b) { return a <= b; };
  } else {
    api.gt = function (a, b) { return a > b; };
    api.lt = function (a, b) { return a < b; };
  }
  return api;
};