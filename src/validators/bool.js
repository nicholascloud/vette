'use strict';
var any = require('./any');

module.exports = function bool (message) {
  message = message || 'value must be boolean';
  return any([true, false], message);
};