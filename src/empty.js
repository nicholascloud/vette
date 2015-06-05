'use strict';
var keys = require('./keys');

module.exports = function empty (target) {
  var length = target.hasOwnProperty('length') ?
    target.length :
    keys(target).length;
  return Number(length) === 0;
};