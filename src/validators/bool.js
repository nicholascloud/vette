'use strict';
var any = require('./any');

module.exports = function bool (message) {
  return any([true, false], message);
};